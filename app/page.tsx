import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Button,
} from "@nextui-org/react";

import { Toaster } from "react-hot-toast";
import AddLog from "./Components/UpdatedTable";

export default function Home() {
  return (
    <main className="flex m-2 ">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options for different types of toasts
          success: {
            duration: 3000,
            style: {
              background: "#4caf50",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#4caf50",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "#f44336",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#f44336",
            },
          },
        }}
      />

      <Card className="w-full dark">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <Link href="/Table">
              <Button>View Table</Button>
            </Link>
          </div>
        </CardHeader>

        <Divider />
        <CardBody>
          <AddLog />
        </CardBody>
        <Divider />
        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
