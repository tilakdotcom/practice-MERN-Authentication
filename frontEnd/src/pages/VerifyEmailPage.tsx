import OTPInput from "@/components/OPTInput";

const VerifyEmailPage: React.FC = () => {
  const handleSubmit = (pin: string) => {
    // handle api request here but I'm console logging it
    console.log(pin)
}
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 px-3">
      <div className="p-6 bg-white rounded-lg shadow-lg space-y-3.5 md:space-y-5 mx-auto">
        <h1 className="md:text-2xl text-xl font-semibold text-green-600 text-center ">Verify Your Email</h1>
        <p className="text-sm text-gray-600 text-center ">
          To complete verification, please Enter the opt below.
        </p>
        
        <div className="border-2 border-dashed border-green-300 rounded-lg p-4 flex items-center justify-center ">
          <OTPInput length={6} onComplete={handleSubmit} />
        </div>

        <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
