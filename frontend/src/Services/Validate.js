const validate = (formData) => {
    let invalidData = {};
    const objKeyRegex = /^([\w]+)\[([\w]+)?\]/;
    let formObj = {};
    
    const isJson = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    formData.forEach((value, key) => {
        let keyMatch = key.match(objKeyRegex);
        if (keyMatch && keyMatch[1] && keyMatch[2]) {
            // Object
            formObj[keyMatch[1]] = formObj[keyMatch[1]] ? formObj[keyMatch[1]] : {};
            formObj[keyMatch[1]][keyMatch[2]] = isJson(value) ? JSON.parse(value) : value; // If JSON.parse works assign value
        } else if (keyMatch && keyMatch[1]) {
            // Array
            formObj[keyMatch[1]] = formObj[keyMatch[1]] ? formObj[keyMatch[1]] : [];
            formObj[keyMatch[1]].push(value);
        }
        else formObj[key] = value;
    });

    const addToInvalid = (key, errMsg) => {
        if (key in invalidData) {
            invalidData[key].push(errMsg);
        } else {
            invalidData[key] = [errMsg];
        }
    };

    const getCurrentYear = () => {
        var dateObj = new Date();
        var year = dateObj.getUTCFullYear();

        return year;
    };

    for (const [key, value] of Object.entries(formObj)) {
        switch (key) {
            case "username":
                const usernameRegex = /^[a-zA-Z0-9]/g;
                const usernameMatch = value.match(usernameRegex);
                if (!usernameMatch) {
                    addToInvalid("username", "username contains special characters");
                }
                if (value.length < 2 || value.length > 30) {
                    addToInvalid("username", "username length must be 2-30 characters long");
                }
                if (value.length === 0) {
                    addToInvalid("username", "no username specified");
                }
                break;

            case "fullname":
                const nameRegex = /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/;
                const fullnameMatch = value.match(nameRegex);

                if (!fullnameMatch) {
                    addToInvalid("fullname", "unsupported name format");
                }
                break;

            case "login":
                break;

            case "description":
                break;

            case "email":
                const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const emailMatch = value.match(emailRegex);

                if (!emailMatch) {
                    addToInvalid("email", "invalid email format");
                }
                break;

            case "password":
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
                const passwordMatch = value.match(passwordRegex);

                if (!passwordMatch) {
                    addToInvalid("password", "password must contain a minimum of eight characters, and at least one letter and one number:")
                }
                break;
            
            case "projectname":
                const projectRegex = /[^A-Za-z0-9\s]/;
                const projectMatch = value.match(projectRegex);
                if (!value) {
                    addToInvalid("projectname", "project name must not be empty");
                }
                else if (projectMatch) {
                    addToInvalid("projectname", "project name contains special characters");
                }
                break;

            case "interests":
                break;

            case "experiences":
                break;

            case "tags":
                if ( value.length === 0 ) {
                    addToInvalid("Tags", "need at least one tags");
                }
                break;

            case "birthday":
                //check birthday
                const {day, month, year} = value;
                const dayCount = [
                    31,28,31,30,31,30,30,31,31,30,31,30,31,
                ];

                //check month
                if (month > 12 || month < 1) {
                    addToInvalid("birthday", "invalid month");
                }

                //check day
                if (month === 2) {
                    // is leap year
                    if (
                        (0 === year % 4 && 0 !== year % 100) ||
                        0 === year % 400
                    ) {
                        if (day > 29 || day < 1) {
                            addToInvalid("birthday", "invalid day");
                        }
                    } else {
                        if (day > 28 || day < 1) {
                            addToInvalid("birthday", "invalid day");
                        }
                    }
                } else {
                    if (day > dayCount[month - 1]) {
                        addToInvalid("birthday", "invalid day");
                    }
                }

                //check year
                if (year > getCurrentYear()) {
                    addToInvalid("birthday", "invalid year");
                }
                break;

            default:
                addToInvalid("invalidKey", [key, value]);
                break;
        }
    }

    // check if object is empty, returns true are there is no keys in err
    let valid = Object.keys(invalidData).length === 0 && invalidData.constructor === Object;
    return { valid: valid, invalidData: invalidData };
};

export default validate;
