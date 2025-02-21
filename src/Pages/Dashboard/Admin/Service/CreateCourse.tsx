import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import AppSelect from "@/components/CustomForm/AppSelect";
import { useState } from "react";
import DynamicSelectField from "@/components/CustomForm/DynamicSelect";
import { TCourseForm } from "@/types/course.type";
import { createCourseSchema } from "@/schemas/course.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import Loader from "@/components/Loader/Loader";

// Fetch subjects from the database
const fetchSubjects = async () => {
  const response = await axiosInstance.get("/subjects/get-all-subjects");
  return response?.data?.data; // Assuming the API response contains a data array
};

const fetchCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response?.data?.data; // Assuming response contains an array
};

// Create course function
const createCourse = async (courseData: TCourseForm) => {
  const response = await axiosInstance.post(
    "/courses/create-course",
    courseData
  );
  return response.data;
};

const CreateCourse = () => {
  const [img, setImg] = useState<string>(""); // Handle batch image
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [careerOpportunities, setCareerOpportunities] = useState<string[]>([]);
  const [curriculum, setCurriculum] = useState<string[]>([]);
  const [jobPositions, setJobPositions] = useState<string[]>([]);
  const [softwareList, setSoftwareList] = useState<string[]>([]);

  // Fetch categories
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoryError,
  } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });

  // Fetch subjects
  const {
    data: subjects,
    isLoading: isLoadingSubjects,
    error: subjectsError,
  } = useQuery({ queryKey: ["subjects"], queryFn: fetchSubjects });

  // Mutation for creating a course
  const mutation = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      Swal.fire("Success!", "Course created successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["courses"] }); // Invalidate courses list
      navigate("/dashboard/admin/course-management/all-courses");
    },
    onError: (error) => {
      console.error("Error creating course:", error);
      Swal.fire(
        "Error!",
        "Failed to create the course. Please try again.",
        "error"
      );
    },
  });

  const onSubmit = (data: TCourseForm) => {
    const finalData = {
      ...data,
      img,
      careerOpportunities,
      curriculum,
      jobPositions,
      softwareList,
    };

    mutation.mutate(finalData); // Trigger the mutation
    navigate("/dashboard/admin/course-management/all-courses");
  };

  if (isLoadingCategories || isLoadingSubjects) {
    return <Loader />;
  }

  if (categoryError || subjectsError)
    return <p>Error loading data. Please try again.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">
        Create Course
      </h1>

      <AppForm
        schema={createCourseSchema}
        onSubmit={onSubmit}
        buttonText="Create Course"
        alignButton="center"
        defaultValues={{
          name: "",
          description: "",
          overview: "",
          img: "",
          category: "",
          language: "",
          courseType: "",
          coursePrice: 0,
          courseLength: "",
          skillLevel: "",
          subjects: [],
          careerOpportunities: [],
          curriculum: [],
          jobPositions: [],
          softwareList: [],
          classNumber: 0,
          projectNumber: 0,
        }}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Name */}
          <AppInput
            className="w-full"
            name="name"
            label="Course Name"
            placeholder="Enter course name"
          />
          {/* Description */}
          <AppInput
            className="w-full "
            name="description"
            label="Description"
            placeholder="Enter description"
          />
          {/* Course Overview */}
          <AppInput
            className="w-full "
            name="overview"
            label="Overview"
            placeholder="Enter overview"
          />

          {/* Image Upload Section */}
          <div className="text-sm truncate">
            <label className="block font-medium text-white">
              Upload Cover Image
            </label>
            <ImageUpload setUploadedImageUrl={setImg} />
          </div>
          {/* Language */}
          <AppSelect
            name="language"
            label="Language"
            placeholder="Select a language"
            options={[
              { value: "Bangla", label: "Bangla" },
              { value: "English", label: "English" },
              { value: "Hindi", label: "Hindi" },
              { value: "Arabic", label: "Arabic" },
            ]}
          />

          {/* Category */}
          <AppSelect
            name="category"
            label="Category"
            placeholder="Select a category"
            options={categories.map(
              (category: { _id: string; name: string }) => ({
                value: category._id,
                label: category.name,
              })
            )}
          />

          {/* Course Price */}
          <AppInput
            className="w-full "
            name="coursePrice"
            label="Price"
            placeholder="Enter a price"
          />
          {/* Course Time Length */}
          <AppInput
            className="w-full "
            name="courseLength"
            label="Course Duration"
            placeholder="Enter course duration"
          />
          {/* Skill Level */}
          <AppSelect
            name="skillLevel"
            label="Skill Level"
            placeholder="Select a skill level"
            options={[
              {
                value: "Beginner to Intermediate",
                label: "Beginner to Intermediate",
              },
              {
                value: "Intermediate to Advanced",
                label: "Intermediate to Advanced",
              },
              { value: "Beginner to Advanced", label: "Beginner to Advanced" },
            ]}
          />

          {/* Course Type */}
          <AppSelect
            name="courseType"
            label="Course Type"
            placeholder="Select course type"
            options={[
              { value: "Online", label: "Online" },
              { value: "Offline", label: "Offline" },
              { value: "Pre-Recorded", label: "Pre-Recorded" },
            ]}
          />

          {/* Subjects */}
          <AppSelect
            name="subjects"
            label="Subjects"
            placeholder="Select subjects"
            isMulti={true}
            options={subjects.map((subject: { _id: string; name: string }) => ({
              value: subject._id,
              label: subject.name,
            }))}
          />
          {/* Project Qty */}
          <AppInput
            className="w-full "
            name="projectNumber"
            label="Projects"
            placeholder="Enter project quantity"
          />
          {/* Class Qty */}
          <AppInput
            className="w-full "
            name="classNumber"
            label="Class Number"
            placeholder="Enter class numbers"
          />
        </div>
        <div className="grid grid-cols-1 mt-5 md:grid-cols-2 md:gap-6 lg:grid-cols-2">
          {/* Career Opportunities */}
          <DynamicSelectField
            label="Career Opportunities"
            placeholder="Select or add opportunities"
            options={careerOpportunities.map((opportunity) => ({
              value: opportunity,
              label: opportunity,
            }))}
            defaultValue={careerOpportunities} // Pass defaultValue for prefilled data
            onChange={setCareerOpportunities}
          />
          {/* Curriculum */}
          <DynamicSelectField
            label="Curriculum"
            placeholder="Select or add curriculum"
            options={curriculum.map((item) => ({ value: item, label: item }))}
            defaultValue={curriculum} // Pass defaultValue for prefilled data
            onChange={setCurriculum}
          />
          {/* Job Positions */}
          <DynamicSelectField
            label="Job Positions"
            placeholder="Select or add job positions"
            options={jobPositions.map((position) => ({
              value: position,
              label: position,
            }))}
            defaultValue={jobPositions} // Pass defaultValue for prefilled data
            onChange={setJobPositions}
          />
          {/* Software List */}
          <DynamicSelectField
            label="Software List"
            placeholder="Select or add software"
            options={softwareList.map((software) => ({
              value: software,
              label: software,
            }))}
            defaultValue={softwareList} // Pass defaultValue for prefilled data
            onChange={setSoftwareList}
          />
        </div>
      </AppForm>
    </div>
  );
};

export default CreateCourse;
