
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Chrome, Github, Facebook } from 'lucide-react';

interface AuthCardProps {
  onLogin: () => void;
}

const AuthCard = ({ onLogin }: AuthCardProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            TaskFlow
          </h1>
          <p className="text-gray-600">Organize your tasks, boost your productivity</p>
        </div>

        {/* Auth Card */}
        <Card className="bg-white/80 backdrop-blur-md border-white/20 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Welcome Back
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Sign in to access your tasks and collaborate with others
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Social Login Buttons */}
            <Button
              onClick={onLogin}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md"
              variant="outline"
            >
              <Chrome className="w-5 h-5 mr-3 text-blue-600" />
              Continue with Google
            </Button>

            <Button
              onClick={onLogin}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <Github className="w-5 h-5 mr-3" />
              Continue with GitHub
            </Button>

            <Button
              onClick={onLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <Facebook className="w-5 h-5 mr-3" />
              Continue with Facebook
            </Button>

            {/* Demo Login */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or for demo</span>
              </div>
            </div>

            <Button
              onClick={onLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Try Demo Account
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Secure authentication powered by OAuth 2.0</p>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
