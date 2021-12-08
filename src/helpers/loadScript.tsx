const loadScript = (url, script_name, callback?) => {
    const existingScript = document.getElementById('scriptId');

    if (!existingScript) {
        const script = document.createElement('script');
        script.src = url;
        script.id = script_name;
        document.body.appendChild(script);

        script.onload = () => {
            if (callback) callback();
        };
    }

    if (existingScript && callback) callback();
};
export default loadScript;