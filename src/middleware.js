import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/auth"];
const STUDENT_PATHS = ["/student"];
const TEACHER_PATHS = ["/teacher"];

const matchPath = (path, prefixes) => prefixes.some((p) => path === p || path.startsWith(p + "/"));
const isPublic = (path) => matchPath(path, PUBLIC_PATHS);
const isStudent = (path) => matchPath(path, STUDENT_PATHS);
const isTeacher = (path) => matchPath(path, TEACHER_PATHS);

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  // question one: 
  // 1- not logged in and try to go to dashboards ==> redirect to auth
  if (!token && !isPublic(pathname)) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  // 2- logged in and try to auth ==> redirect to his dashboard
  if (token && isPublic(pathname)) {
    if (role === "STUDENT") return NextResponse.redirect(new URL("/student/home", request.url));
    if (role === "TEACHER") return NextResponse.redirect(new URL("/teacher/home", request.url));
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  // 3- user is a student and try to go to teacher dash ==> redirect to student
  if (role === "STUDENT" && isTeacher(pathname)) {
    return NextResponse.redirect(new URL("/student/home", request.url));
  }
  // 4- user is a teacher and try to go to student dash ==> redirect to teacher
  if (role === "TEACHER" && isStudent(pathname)) {
    return NextResponse.redirect(new URL("/teacher/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/student/:path*", "/teacher/:path*"],
}