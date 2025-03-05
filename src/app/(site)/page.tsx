import Image from "next/image";
import { DATA } from "@/data/data";
import CourseCard from "@/components/globals/course-card";

export default function Home() {
  return (
    <div className='pb-10'>
      <div className="relative w-full h-[70vh]">
        <Image
          src="/banner.png"
          alt="Banner"
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute lg:top-52 lg:left-20 left-[3px] lg:block hidden bg-white shadow lg:py-10 py-5 px-5 lg:pr-20 rounded-md">
          <h1 className="lg:text-4xl text-xl font-bold font-serif">Find the right fit</h1>
          <p>The topics you want, posted by real-world experts.</p>
        </div>
      </div>
      <div className="mt-10">
        <h1 className="lg:text-3xl text-2xl font-bold font-serif">
          Cybersecurity content you need in one place.
        </h1>
        <p className='lg:mt-0 mt-3'>
          From critical skills to technical topics, Cybersafe supports your
          learning journey with the latest in cybersecurity content.
        </p>
        <div className="mt-5">
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-5">
            {DATA.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                createdAt={course.dateAdded}
                thumbnail={course.thumbnail}
                description={course.description}
                slug={course.slug}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
