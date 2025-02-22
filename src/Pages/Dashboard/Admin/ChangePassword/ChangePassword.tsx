import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { handleAxiosError } from "@/utils/handleAxiosError";
import axiosInstance from "@/api/axiosInstance";
import { AxiosError } from "axios";
type ProfileFormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>();

  const onSubmit = async (data: ProfileFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      return Swal.fire("Error", "Passwords do not match", "error");
    }

    const finalData = {
      oldPassword: data?.oldPassword,
      newPassword: data?.newPassword,
    };
    try {
      // TODO: Replace with server url
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await axiosInstance.post("/auth/change-password", finalData);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Password changed successfully",
        customClass: {
          title: "custom-title",
          popup: "custom-popup",
          icon: "custom-icon",
          confirmButton: "custom-confirm-btn",
        },
      });
      reset(); // Reset form after success
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: AxiosError | any) {
      handleAxiosError(error, "Failed to change password");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-5 overflow-hidden">
      <h1 className="sm:text-2xl md:text-4xl lg:text-5xl uppercase text-blue-500 underline underline-offset-8">
        Change Password
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Old Password"
          {...register("oldPassword", { required: "Old Password is required" })}
          className={`bg-white px-4 py-2 border ${
            errors.oldPassword ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        />
        {errors.oldPassword && (
          <span className="text-red-500">{errors.oldPassword.message}</span>
        )}

        <input
          type="password"
          placeholder="New Password"
          {...register("newPassword", { required: "New Password is required" })}
          className={`bg-white px-4 py-2 border ${
            errors.newPassword ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        />
        {errors.newPassword && (
          <span className="text-red-500">{errors.newPassword.message}</span>
        )}

        <input
          type="password"
          placeholder="Confirm New Password"
          {...register("confirmPassword", {
            required: "Please confirm your new password",
          })}
          className={`bg-white px-4 py-2 border ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}

        <button
          type="submit"
          className="px-5 py-2 bg-blue-500 text-white rounded-md uppercase font-bold"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
