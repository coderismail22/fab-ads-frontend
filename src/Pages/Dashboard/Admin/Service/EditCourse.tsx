/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import AppSelect from "@/components/CustomForm/AppSelect";
import DynamicSelectField from "@/components/CustomForm/DynamicSelect";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { TCourseForm } from "@/types/course.type";
import { updateCourseSchema } from "@/schemas/course.schema";
import axiosInstance from "@/api/axiosInstance";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import Loader from "@/components/Loader/Loader";

type FetchCourseResponse = {
  success: boolean;
  message: string;
  data: TCourseForm; // The `data` field contains the batch details
};

// Fetch course details by ID
const fetchCourseById = async (
  courseId: string
): Promise<FetchCourseResponse> => {
  const response = await axiosInstance.get(
    `/courses/get-single-course/${courseId}`
  );
  return response?.data;
};

// Fetch categories
const fetchCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response?.data?.data; // Assuming response contains an array of batches
};

// Fetch subjects from the subjects collection
// TODO: Previous subjects are not being selected automatically
const fetchSubjects = async () => {
  const response = await axiosInstance.get("/subjects/get-all-subjects");
  console.log("look subjects here", response?.data?.data);
  return response?.data?.data;
};

// Update course
const updateCourse = async (
  courseId: string,
  data: TCourseForm
): Promise<void> => {
  await axiosInstance.patch(`/courses/update-course/${courseId}`, data);
};

const EditCourse = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [img, setImg] = useState<string>(""); // Handle batch image
  const [careerOpportunities, setCareerOpportunities] = useState<string[]>([]);
  const [curriculum, setCurriculum] = useState<string[]>([]);
  const [jobPositions, setJobPositions] = useState<string[]>([]);
  const [softwareList, setSoftwareList] = useState<string[]>([]);

  // Fetch course details
  const {
    data: course,
    isLoading: isLoadingCourse,
    error: courseError,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => fetchCourseById(courseId!),
    enabled: !!courseId,
  });

  // Fetch categories
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoryError,
  } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });

  // Fetch subjects
  const {
    data: subjects = [],
    isLoading: isLoadingSubjects,
    error: subjectsError,
  } = useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjects,
  });

  // Update dynamic fields when data is available
  useEffect(() => {
    if (course) {
      setImg(course?.data?.img || "");
      setCareerOpportunities(course?.data?.careerOpportunities || []);
      setCurriculum(course?.data?.curriculum || []);
      setJobPositions(course?.data?.jobPositions || []);
      setSoftwareList(course?.data?.softwareList || []);
    }
  }, [course]);

  // Mutation for updating the course
  const mutation = useMutation({
    mutationFn: (data: TCourseForm) => updateCourse(courseId!, data),
    onSuccess: () => {
      Swal.fire("Updated!", "Course has been updated successfully.", "success");
      queryClient.invalidateQueries({ queryKey: ["courses"] }); // Invalidate the courses list
      navigate("/dashboard/admin/course-management/all-courses"); // Redirect to course list
    },
    // TODO: Add a type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error("Error updating course:", error?.response?.data);
      Swal.fire("Error!", "Failed to update course.", "error");
    },
  });

  // Handle form submission
  const onSubmit = (data: TCourseForm) => {
    const finalData = {
      ...data,
      img,
      careerOpportunities,
      curriculum,
      jobPositions,
      softwareList,
    };
    mutation.mutate(finalData);
  };

  // Handle undefined default values
  const defaultValues = {
    ...course?.data,
    subjects:
      course?.data?.subjects?.map((subject: any) =>
        typeof subject === "string" ? subject : subject?._id
      ) || [],
  };

  if (isLoadingCourse || isLoadingSubjects || isLoadingCategories) {
    <Loader />;
  }
  if (courseError || subjectsError || categoryError)
    return <p>Error loading data. Please try again later.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">
        Edit Course
      </h1>
      {course && (
        <AppForm
          schema={updateCourseSchema}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          submitButtonStyles="w-[150px]"
          buttonText="Save Changes"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Name */}
            <AppInput
              name="name"
              label="Course Name"
              placeholder="Enter course name"
            />
            {/* Description */}
            <AppInput
              name="description"
              label="Description"
              placeholder="Enter description"
            />
            {/* Image Upload Section */}
            <div className="text-sm truncate">
              <label className="block font-medium text-white">
                Upload Cover Image
              </label>
              <ImageUpload setUploadedImageUrl={setImg} />
              {img === "" && (
                <p className="text-red-500 text-sm">Image is required</p>
              )}
            </div>
            {/* Language */}
            <AppSelect
              name="language"
              label="Language"
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
              options={categories?.map(
                (category: { _id: string; name: string }) => ({
                  value: category._id,
                  label: category.name,
                })
              )}
            />
            {/* Price */}
            <AppInput
              name="coursePrice"
              label="Price"
              placeholder="Enter price"
            />
            {/* Duration */}
            <AppInput
              name="courseLength"
              label="Course Duration"
              placeholder="Enter duration"
            />
            {/* Skill Level */}
            <AppSelect
              name="skillLevel"
              label="Skill Level"
              options={[
                {
                  value: "Beginner to Intermediate",
                  label: "Beginner to Intermediate",
                },
                {
                  value: "Intermediate to Advanced",
                  label: "Intermediate to Advanced",
                },
                {
                  value: "Beginner to Advanced",
                  label: "Beginner to Advanced",
                },
              ]}
            />
            {/* Course Type */}
            <AppSelect
              name="courseType"
              label="Course Type"
              options={[
                { value: "Online", label: "Online" },
                { value: "Offline", label: "Offline" },
                { value: "Hybrid", label: "Hybrid" },
              ]}
            />
            {/* Subjects */}
            <AppSelect
              name="subjects"
              label="Subjects"
              placeholder="Select subjects"
              isMulti={true}
              options={subjects?.map(
                (subject: { _id: string; name: string }) => ({
                  value: subject._id,
                  label: subject.name,
                })
              )}
            />
          </div>
          <div className="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Career Opportunities */}
            <DynamicSelectField
              label="Career Opportunities"
              placeholder="Select career opportunities"
              options={careerOpportunities?.map((item) => ({
                value: item,
                label: item,
              }))}
              defaultValue={careerOpportunities} // Pre-filled values
              onChange={(selectedValues) =>
                setCareerOpportunities(selectedValues)
              }
            />

            {/* Curriculum */}
            <DynamicSelectField
              label="Curriculum"
              placeholder="Select curriculum"
              options={curriculum?.map((item) => ({
                value: item,
                label: item,
              }))}
              defaultValue={curriculum} // Pre-filled values
              onChange={(selectedValues) => setCurriculum(selectedValues)}
            />

            {/* Job Positions */}
            <DynamicSelectField
              label="Job Positions"
              placeholder="Select job positions"
              options={jobPositions?.map((item) => ({
                value: item,
                label: item,
              }))}
              defaultValue={jobPositions} // Pre-filled values
              onChange={(selectedValues) => setJobPositions(selectedValues)}
            />

            {/* Software List */}
            <DynamicSelectField
              label="Software List"
              placeholder="Select software list"
              options={softwareList?.map((item) => ({
                value: item,
                label: item,
              }))}
              defaultValue={softwareList} // Pre-filled values
              onChange={(selectedValues) => setSoftwareList(selectedValues)}
            />
          </div>
        </AppForm>
      )}
    </div>
  );
};

export default EditCourse;
