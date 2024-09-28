import { NextResponse } from "next/server";

export async function GET() {
  // console.log('NextResponse object:', NextResponse);
  // console.log('NextResponse methods:', Object.getOwnPropertyNames(NextResponse));
  // console.log('NextResponse prototype methods:', Object.getOwnPropertyNames(NextResponse.prototype));
  
  const response = NextResponse.json({ joke: "Why don't programmers like nature? It has too many bugs!" });
  console.log('Created response:', response);
  
  return response;
}

// export async function GET() {
//   const joke = { joke: "Why don't programmers like nature? It has too many bugs!" };
  
//   return new Response(JSON.stringify(joke), {
//     status: 200,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// }