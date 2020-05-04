using System;
using System.Collections.Generic;
using System.Text;

namespace BD.Common
{
    public class MethodResult<TValueClass>
    {
        public TValueClass Value { get; set; }

        public bool IsOk { get; set; }

        public string Message { get; set; }

        public string ExceptionMessage { get; set; }

        public List<string> ErrorList { get; set; }

        public MethodResultLevel ResultLevel { get; set; }

        private Exception _exception { get; set; }

        public string GetResultLevelDescription()
        {
            return this.ResultLevel.GetDescription();
        }

        public MethodResult<TValueClass> SetException(Exception ex)
        {
            this._exception = ex;
            this.FillExceptionMessage();
            return this;
        }

        public MethodResult<TValueClass> SetValue(TValueClass value)
        {
            this.Value = value;
            return this;
        }

        public Exception GetException()
        {
            return this._exception;
        }

        [Obsolete("Use GetFullExceptionMessage")]
        public string GetFullExceptionMessage(Exception ex)
        {
            StringBuilder stringBuilder = new StringBuilder();
            if (ex == null)
                return stringBuilder.ToString();
            stringBuilder.AppendFormat("Message: {0}; Error body: {1}", (object)this.Message, (object)ex.Message);
            if (ex.InnerException != null)
                stringBuilder.AppendFormat("\r\nInner exception: {0}", (object)this.GetFullExceptionMessage(ex.InnerException));
            return stringBuilder.ToString();
        }

        public string GetFullExceptionMessage()
        {
            if (this._exception == null)
                return string.Format("Message: {0}; Exception missing", (object)this.Message);
            return string.Format("Description:{0}\r\nTrace:{1}", (object)this.GetFullExceptionMessage(this._exception), (object)this._exception.StackTrace);
        }

        [Obsolete("Use GetFullExceptionMessage")]
        public string FillExceptionMessage()
        {
            this.ExceptionMessage = this.GetFullExceptionMessage();
            return this.ExceptionMessage;
        }

        [Obsolete("Use GetFullExceptionMessage")]
        public string GetFullDescription()
        {
            this.FillExceptionMessage();
            return string.Format("Error level:{0}\r\nMessage:{1}\r\nError:{2}", (object)this.GetResultLevelDescription(), (object)this.Message, (object)this.ExceptionMessage);
        }

        public MethodResult()
        {
            this.IsOk = false;
            this.Message = "Undefined";
            this.ResultLevel = MethodResultLevel.Unknown;
        }

        public MethodResult<TValueClass> SetSuccess(TValueClass value, string message = "")
        {
            this._exception = (Exception)null;
            this.IsOk = true;
            this.Message = message;
            this.ResultLevel = MethodResultLevel.OK;
            this.Value = value;
            return this;
        }

        public MethodResult<TValueClass> SetError(string message, MethodResultLevel level, Exception ex = null)
        {
            this._exception = ex;
            this.IsOk = false;
            this.Message = message;
            this.ResultLevel = level;
            this.FillExceptionMessage();
            return this;
        }

        public MethodResult<TValueClass> SetErrorList(List<string> listErrors)
        {
            this.ErrorList = listErrors;
            return this;
        }

        public void ThrowExceptionIfNotOk()
        {
            if (this.IsOk)
                return;
            this.ThrowException();
        }

        public void ThrowException()
        {
            throw this._exception == null ? new Exception() : new Exception(this.Message);
        }

        public static MethodResult<TValueClass> GetErrorResult(string message = "", MethodResultLevel level = MethodResultLevel.Unknown, Exception ex = null)
        {
            MethodResult<TValueClass> methodResult = new MethodResult<TValueClass>();
            methodResult._exception = ex;
            methodResult.IsOk = false;
            methodResult.Message = message;
            methodResult.ResultLevel = level;
            methodResult.FillExceptionMessage();
            return methodResult;
        }

        public static MethodResult<TValueClass> GetExceptionResult(string message, MethodResultLevel level, Exception ex)
        {
            MethodResult<TValueClass> methodResult = new MethodResult<TValueClass>();
            methodResult._exception = ex;
            methodResult.IsOk = false;
            methodResult.Message = message;
            methodResult.ResultLevel = level;
            methodResult.FillExceptionMessage();
            return methodResult;
        }

        public static MethodResult<TValueClass> GetSuccessResult(TValueClass value, string message = "")
        {
            return new MethodResult<TValueClass>()
            {
                _exception = (Exception)null,
                IsOk = true,
                Message = message,
                ResultLevel = MethodResultLevel.OK,
                Value = value
            };
        }
    }
}
