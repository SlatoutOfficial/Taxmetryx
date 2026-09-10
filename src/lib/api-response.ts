import { NextResponse } from "next/server";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export function successResponse<T>(data: T, message = "Success", status = 200) {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

export function errorResponse(message: string, status = 400, errors?: Record<string, string[]>) {
  return NextResponse.json<ApiResponse>(
    {
      success: false,
      message,
      errors,
    },
    { status }
  );
}
