class apiResponse {
  constructor(statuscode, data, message = "success") {
    this.statuscode = statuscode
    this.data = data;
    this.message = message 
    this.success = statusCode < 400
  }
}