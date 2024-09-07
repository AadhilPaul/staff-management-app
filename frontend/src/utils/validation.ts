import pako from 'pako';


async function loadForbiddenPasswords(): Promise<string[]> {
    try {
        const response = await fetch(`https://raw.githubusercontent.com/django/django/main/django/contrib/auth/common-passwords.txt.gz`)
        if (!response.ok) {
            throw new Error("Network response was not ok!")
        }

        const arrayBuffer = await response.arrayBuffer();
        const decompressedData = pako.ungzip(new Uint8Array(arrayBuffer), {to: "string"})

        const forbiddenPasswords = decompressedData.split('\n').map((line) => line.trim().toLowerCase())
        return forbiddenPasswords;
    } catch (err) {
        throw new Error(`Error reading the file: ${(err as Error).message}`);
    }
}

// async function passwordValidator(filepath: string, password: string) {
//     try {
//         const forbiddenPasswords = await loadForbiddenPasswords(filepath)
//         const normalizedPassword = password.toLowerCase();

//         if (forbiddenPasswords.includes(normalizedPassword)) {
//             return true
//         }
//         return null;
//     } catch (err) {
//         return 'An error occured during validation.'
//     }
// }

export default loadForbiddenPasswords;