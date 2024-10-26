import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from("birthdayPersons")
      .insert(body)
      .select()
      .single();

    if (error) {
      console.error("Error adding birthday:", error);
      return NextResponse.json(
        { error: "Failed to add birthday" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("birthdayPersons")
      .select(
        `
        *,
        category:categories(name)
      `
      )
      .order("birthDate");

    if (error) {
      console.error("Error fetching birthdays:", error);
      return NextResponse.json(
        { error: "Failed to fetch birthdays" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const { error } = await supabase
      .from("birthdayPersons")
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting birthday:", error);
      return NextResponse.json(
        { error: "Failed to delete birthday" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Birthday deleted successfully" });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    console.log('Received update request with body:', body);

    const { id, ...updateData } = body;
    console.log('Updating birthday with id:', id);
    console.log('Update data:', updateData);

    const { data, error } = await supabase
      .from("birthdayPersons")
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        category:categories(id, name)
      `)
      .single();

    if (error) {
      console.error("Error updating birthday:", error);
      return NextResponse.json(
        { error: "Failed to update birthday", details: error },
        { status: 500 }
      );
    }

    console.log('Successfully updated birthday:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
