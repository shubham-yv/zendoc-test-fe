import axios from 'axios';
import { getUserIDFromIndexedDB } from '../Actions/indexedDB';


// const API_URL = 'https://api.wellnestperu.com';
const API_URL = 'http://localhost:5000';

export const submitProfile = async (formData, setCompleteProfilePercenrtage) => {
    try {
        const userId = await getUserIDFromIndexedDB();

        if (!userId) {
            console.log('UserId is not stored in IndexedDB.');
            return false;
        }

        const ProfileData = {
            UserId: userId,
            roleID: '1',
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.contact,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pinCode: formData.pinCode,
            linkedInAccount: formData.linkedIn,
            education: formData.education,
            specialization: formData.specialities,
            experienceInYears: formData.workExperience,
            regMedicalID: formData.medicalID,
            profilePic: formData.photoID,
            doctorDegree: formData.doctorDegree,
        };

        const response = await axios.post(`${API_URL}/v1/user/completeDoctorProfile`, ProfileData);


        const State = await axios.post(`${API_URL}/v1/user/completeDoctorProfile`, ProfileData.state);
        const District = await axios.post(`${API_URL}/v1/user/completeDoctorProfile`, ProfileData);
        const City = await axios.post(`${API_URL}/v1/user/completeDoctorProfile`, ProfileData);

        if (response.status === 200) {
            console.log('Data successfully submitted!');

            const DoctorProfileDetailsUserID = { userID: userId };
            const DoctorProfileDetails = await axios.post(`${API_URL}/v1/user/getDoctorProfileDetails`, DoctorProfileDetailsUserID);

            console.log(DoctorProfileDetails)
            if (DoctorProfileDetails) {
                setCompleteProfilePercenrtage(DoctorProfileDetails.data.data.profileCompletionPercentage)
            }
            return true;
        } else {
            console.error('Failed to submit data.');
            return false;
        }
    } catch (error) {
        console.error('Error during data submission:', error);
        return false;
    }
};

export const getCountry = async (setStoredCountry) => {
    try {
        const countryResponse = await axios.post(`${API_URL}/v1/common/getCountry`);
        const countryData = countryResponse.data.countryData;

        setStoredCountry(countryData);

    } catch (error) {
        console.log("ERROR IN COUNTRY:", error);
    }
}

export const getState = async (storeCountry, setStoredState) => {
    try {

        const countryId = storeCountry[0].id;

        const State = await axios.post(`${API_URL}/v1/common/getStateById`, { countryId: countryId });
        const stateData = State.data.stateData;
        setStoredState(stateData)

    } catch (error) {
        console.log("ERROR IN State:", error);
    }
}

export const getDistrict = async (storeState, setStoredDistrict, formData) => {
    try {
        const stateId = formData.state;
        console.log("STATE ID:", stateId)
        const District = await axios.post(`${API_URL}/v1/common/getDistrictById`, { stateId: stateId });
        const DistrictData = District.data.cityData;

        setStoredDistrict(DistrictData)
    } catch (error) {
        console.log("ERROR IN District:", error);
    }
}

export const getCity = async (storeDistrict, setStoredCity, formData) => {
    try {
        const CityId = formData.state;
        console.log("CityId ID:", CityId)
        const City = await axios.post(`${API_URL}/v1/common/getCityById`, { stateId: CityId });
        const CityData = City.data.cityData;
        setStoredCity(CityData)
    } catch (error) {
        console.log("ERROR IN City:", error);
    }
}