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
