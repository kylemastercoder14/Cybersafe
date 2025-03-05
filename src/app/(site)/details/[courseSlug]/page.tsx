import React from "react";
import { DATA } from "@/data/data";
import { Separator } from "@/components/ui/separator";
import parse from "html-react-parser";

const Page = async (props: {
  params: Promise<{
    courseSlug: string;
  }>;
}) => {
  const params = await props.params;
  const decodedSlug = decodeURIComponent(params.courseSlug);
  const course = DATA.find((course) => course.slug === decodedSlug);
  if (!course) {
    return <div className="text-center text-red-500">Course not found</div>;
  }
  return (
    <div className="pb-10 lg:pt-40 pt-20 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold font-serif">{course.title}</h1>
      <p className="text-muted-foreground mt-3 mb-5">
        Posted on {course.dateAdded}
      </p>
      <Separator className="mb-10" />
      <iframe
        width="100%"
        height="500"
        src={course.videoUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <div className="mt-10">{parse(course.description)}</div>
      <div className="mt-10">{parse(course.articleSource)}</div>
    </div>
  );
};

export default Page;
