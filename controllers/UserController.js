import { UserOTPService, VerifyOTPService, SaveProfileService, ReadProfileService } from "../services/UserServices.js";

// Generate OTP
export const UserOTP = async (req, res) => {
    const result = await UserOTPService(req);
    res.status(200).json(result);
};

// Verify OTP for Login
export const VerifyLogin = async (req, res) => {
    const result = await VerifyOTPService(req);

    if (result.status === "success") {
        // Cookie Options
        const cookieOption = { expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: false };

        // Set Cookie with Response
        res.cookie('token', result.token, cookieOption);
        res.status(200).json(result);
    } else {
        res.status(200).json(result);
    }
};

// User Logout
export const UserLogout = async (req, res) => {
    const cookieOption = { expires: new Date(Date.now() - 24 * 60 * 60 * 1000), httpOnly: false };
    res.cookie('token', "", cookieOption);
    res.status(200).json({ status: "success" });
};

// Create or Update Profile
export const CreateProfile = async (req, res) => {
    const result = await SaveProfileService(req);
    res.status(200).json(result);
};

export const UpdateProfile = async (req, res) => {
    const result = await SaveProfileService(req);
    res.status(200).json(result);
};

// Read Profile
export const ReadProfile = async (req, res) => {
    const result = await ReadProfileService(req);
    res.status(200).json(result);
};

export default {
  UserOTP,
  VerifyLogin,
  UserLogout,
  CreateProfile,
  UpdateProfile,
  ReadProfile
};