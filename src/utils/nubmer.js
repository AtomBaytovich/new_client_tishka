function formatNumber(num) {
    if (num >= 1000) {
        const units = ["k", "M", "B", "T"];
        let unitIndex = Math.floor(Math.log10(num) / 3) - 1;
        let formattedNum = (num / Math.pow(1000, unitIndex + 1)).toFixed(1);
        return formattedNum + units[unitIndex];
    }

    return num.toString();
}

export {
    formatNumber
}