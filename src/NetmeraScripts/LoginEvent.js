let nonNativeEvent = new function LoginEvent() {

    this.code="n:cl";

    this.setUserId = function(userId) {
        this["uid"] = userId;
    };

};