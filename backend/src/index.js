import app from "./app";

const main = async () => {
    await app.listen(3001);
    console.log("Express server initialized!");
}

main();