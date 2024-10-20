import { NextResponse } from "next/server";
import OpenAI from "openai";
import * as dotenv from "dotenv";
dotenv.config();

// Define your system prompt
const systemPrompt = `
Objective: Help users know if two drugs are compatible in use together.

Instructions:
You are given two drugs. Output true if they are compatible and false if they are not.
`;

export async function POST(req) {
  // Initialize OpenAI with your API key
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,  // Use your OpenAI API key here
  });

  // Parse the request body to get the drug data
  const data = await req.json();
  const { drug1, drug2 } = data;  // Assuming the request body contains 'drug1' and 'drug2'

  // Create the prompt for the AI based on the drugs provided
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `${drug1} ${drug2}`,  // Input from the request
      },
    ],
    model: "gpt-3.5-turbo",  // Choose the appropriate model, e.g., gpt-4 or gpt-3.5-turbo
    stream: false,
  });

  // Extract the response from the AI and return it as a JSON response
  const message = completion.choices[0].message.content.trim();

  return NextResponse.json({ result: message });
}


