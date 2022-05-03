export async function fakeAPICall() {
    let res = await new Promise(resolve => setTimeout(resolve, 3000));
    return res;
}