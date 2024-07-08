import { authorSeeder } from "./authorSeeders";
import { userSeeder } from "./userSeeder";
import { bookSeeders } from "./bookSeeders";
(async () => {
    console.log("Starting seeders...")
    await authorSeeder();
    await userSeeder();
    await bookSeeders();
})();