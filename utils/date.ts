export const formatDate = (dateString: string | undefined): string => {
    // Create a new Date object from the input string
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return "No date available";
    }

    // Extract the day, month, and year from the Date object
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // Convert the month number to its corresponding month name
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[month];

    // Format the day, month name, and year into the desired output string
    return `${day} ${monthName} ${year}`;
};
