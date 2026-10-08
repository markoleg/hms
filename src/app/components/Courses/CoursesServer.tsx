import Courses from "./Courses";

// Resolved course stories contain their whole page content. Pass only the
// fields the client carousel needs, otherwise every page ships all courses
// in its RSC payload (~hundreds of KB).
export default function CoursesServer({ blok }: { blok: any }) {
  const courses = blok.courses.map((course: any) => ({
    full_slug: course.full_slug,
    tag_list: course.tag_list,
    content: {
      icon: { filename: course.content.icon?.filename },
      title: course.content.title,
      description: course.content.description,
    },
  }));

  return <Courses blok={{ ...blok, courses }} />;
}
