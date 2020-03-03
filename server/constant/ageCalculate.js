const getAge = (dateValue) => {
    let year = new Date(dateValue).getFullYear();
    let d = new Date(dateValue).getDate();
    let m = new Date(dateValue).getMonth() + 1;
    let month = m <= 9 ? `0${m}` : `${m}`;
    let day = d <= 9 ? `0${d}` : `${d}`;
    let dateString = `${year}-${month}-${day}`;

    let now = new Date();
    let today = new Date(now.getYear(), now.getMonth(), now.getDate());

    let yearNow = now.getYear();
    let monthNow = now.getMonth();
    let dateNow = now.getDate();

    let dob = new Date(dateString.substring(6, 10),
        dateString.substring(0, 2) - 1,
        dateString.substring(3, 5)
    );

    let yearDob = dob.getYear();
    let monthDob = dob.getMonth();
    let dateDob = dob.getDate();
    let age = {};
    let ageString = "";
    let yearString = "";
    let monthString = "";
    let dayString = "";
    let monthAge;
    let dateAge;
    let yearAge = yearNow - yearDob;

    if (monthNow >= monthDob)
        monthAge = monthNow - monthDob;
    else {
        yearAge--;
        monthAge = 12 + monthNow - monthDob;
    }

    if (dateNow >= dateDob)
        dateAge = dateNow - dateDob;
    else {
        monthAge--;
        dateAge = 31 + dateNow - dateDob;

        if (monthAge < 0) {
            monthAge = 11;
            yearAge--;
        }
    }
    age = {
        years: yearAge,
        months: monthAge,
        days: dateAge
    };

    if (age.years > 1) yearString = " Years";
    else yearString = " Year";
    if (age.months > 1) monthString = " Months";
    else monthString = " Month";
    if (age.days > 1) dayString = " Days";
    else dayString = " Day";

    if ((age.years > 0) && (age.months > 0) && (age.days > 0))
        ageString = age.years + yearString + " " + age.months + monthString + " " + age.days + dayString;
    else if ((age.years == 0) && (age.months == 0) && (age.days > 0))
        ageString = "Only " + age.days + dayString + " old";
    else if ((age.years > 0) && (age.months == 0) && (age.days == 0))
        ageString = age.years + yearString;
    else if ((age.years > 0) && (age.months > 0) && (age.days == 0))
        ageString = age.years + yearString + " " + age.months + monthString;
    else if ((age.years == 0) && (age.months > 0) && (age.days > 0))
        ageString = age.months + monthString + " " + age.days + dayString;
    else if ((age.years > 0) && (age.months == 0) && (age.days > 0))
        ageString = age.years + yearString + " " + age.days + dayString;
    else if ((age.years == 0) && (age.months > 0) && (age.days == 0))
        ageString = age.months + monthString;
    else ageString = "0";
    return ageString;
}

module.exports = {
    getAge
};