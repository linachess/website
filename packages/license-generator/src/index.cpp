#include <napi.h>
#include <string>
#include "generator.h"

// native C++ function that is assigned to `greetHello` property on `exports` object
Napi::String generateLicenseKey(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    // call `helloUser` function from `greeting.cpp` file
    std::string base_chain = info[0].ToString();
    std::string result = generate_license_key(base_chain);

    // return new `Napi::String` value
    return Napi::String::New(env, result);
}

// callback method when module is registered with Node.js
Napi::Object Init(Napi::Env env, Napi::Object exports) {

    // set a key on `exports` object
    exports.Set(
        Napi::String::New(env, "generateLicenseKey"), // property name => "greetHello"
        Napi::Function::New(env, generateLicenseKey) // property value => `greetHello` function
    );

    // return `exports` object (always)
    return exports;
}

// register `greet` module which calls `Init` method
NODE_API_MODULE(licenseGenerator, Init)