import { Interests, ProjectTags } from "./Mock";

const validate = (data) => {
    var invalidData = {};

    const addToObject = (key, ...data) => {
        if (invalidData[key]) {
            invalidData[key].push(...data);
        } else {
            invalidData[key] = [...data];
        }
    };

    const getCurrentYear = () => {
        var dateObj = new Date();
        var year = dateObj.getUTCFullYear();

        return year;
    };

    for (const key in data) {
        const value = data[key];

        switch (key) {
            case "name":
                const pat = /[a-zA-Z0-9]+/g;
                const match = value.match(pat);
                if (match.length > 1) {
                    addToObject("name", "special character");
                }
                if (value.length > 30) {
                    addToObject("name", "exceed length limit");
                }
                if ( value.length === 0 ) {
                    addToObject("name", "no name specified");
                }
                break;

            case "description":
                break;

            case "interests":
                for (const element of value) {
                    if (!Interests.includes(element))
                        addToObject("interests", `${element}`);
                }
                break;

            case "experiences":
                break;

            case "tags":
                for (const element of value) {
                    if (!ProjectTags.includes(element))
                        addToObject("tags", `${element}`);
                }
                break;

            case "birthdays":
                //check birthday
                const [day, month, year] = value;
                const dayCount = [
                    31,28,31,30,31,30,30,31,31,30,31,30,31,
                ];

                //check month
                if (month > 12 || month < 1) {
                    addToObject("birthdays", "invalid month");
                }

                //check day
                if (month === 2) {
                    // is leap year
                    if (
                        (0 === year % 4 && 0 !== year % 100) ||
                        0 === year % 400
                    ) {
                        if (day > 29 || day < 1) {
                            addToObject("birthdays", "invalid day");
                        }
                    } else {
                        if (day > 28 || day < 1) {
                            addToObject("birthdays", "invalid day");
                        }
                    }
                } else {
                    if (day > dayCount[month - 1]) {
                        addToObject("birthdays", "invalid day");
                    }
                }

                //check year
                if (year > getCurrentYear()) {
                    addToObject("birthdays", "invalid year");
                }
                break;

            default:
                addToObject("invalidKey", [key, value]);
                break;
        }
    }

    return invalidData;
};

export default validate;
