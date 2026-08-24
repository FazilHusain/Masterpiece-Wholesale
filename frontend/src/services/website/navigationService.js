import axios from "../axios";

const navigationService = {

    getNavigation: async () => {
        const { data } = await axios.get("/navigation");
        return data;
    }

}

export default navigationService;