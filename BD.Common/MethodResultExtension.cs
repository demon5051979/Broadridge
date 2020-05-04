using System;
using System.Collections.Generic;
using System.Text;

namespace BD.Common
{
    public static class MethodResultExt
    {
        public static MethodResult<T> ToSuccessMethodResult<T>(this T result)
        {
            return MethodResult<T>.GetSuccessResult(result, string.Empty);
        }

        public static MethodResult<T> ToErrorMethodResult<T>(this Exception ex, MethodResultLevel level = MethodResultLevel.Unknown, string friendlyText = "An error has occurred")
        {
            return MethodResult<T>.GetExceptionResult(friendlyText, level, ex);
        }

        public static MethodResult<T> ToErrorMethodResult<T>(this string friendlyText, MethodResultLevel level = MethodResultLevel.Unknown)
        {
            return MethodResult<T>.GetErrorResult(friendlyText, level, (Exception)null);
        }

        public static MethodResult<T> ToErrorMethodResult<T>(this List<string> errors, Exception ex = null, MethodResultLevel level = MethodResultLevel.Unknown, string friendlyText = "An error has occurred")
        {
            MethodResult<T> methodResult = new MethodResult<T>();
            methodResult.SetError(friendlyText, level, ex);
            methodResult.ErrorList = errors;
            return methodResult;
        }

        public static MethodResult<TTarget> To<TFrom, TTarget>(this MethodResult<TFrom> methodResultFrom, TTarget newValue)
        {
            MethodResult<TTarget> methodResult = new MethodResult<TTarget>();
            methodResult.IsOk = methodResultFrom.IsOk;
            methodResult.Value = newValue;
            methodResult.SetException(methodResultFrom.GetException());
            methodResult.ErrorList = methodResultFrom.ErrorList;
            methodResult.Message = methodResultFrom.Message;
            methodResult.ResultLevel = methodResultFrom.ResultLevel;
            return methodResult;
        }
    }
}
