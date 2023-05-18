using Newtonsoft.Json;

namespace EducationUry.Infrastructure.Common
{
	public class ApiResponse<T>
	{
		public bool IsSuccess { get; set; }
		[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
		public T Data { get; set; }
		[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
		public string Error { get; set; }

		public static ApiResponse<T> Success(T data)
			=> new ApiResponse<T>
			{
				IsSuccess = true,
				Data = data,
			};

		public static ApiResponse<T> Success()
			=> new ApiResponse<T>
			{
				IsSuccess = true,
				Data = default,
			};

		public static ApiResponse<T> Failure(string message)
			=> new ApiResponse<T>
			{
				IsSuccess = false,
				Error = message
			};

		public static ApiResponse<T> Failure()
			=> new ApiResponse<T>
			{
				IsSuccess = false,
				Error = string.Empty
			};
	}
}