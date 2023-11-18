import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@nextui-org/react";
import TableDynamic from ".././Components/Table";
import { Toaster } from "react-hot-toast";

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

      <Card className="max-w-[400px] dark">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <Link href="/">
              <Button>Add Entry</Button>
            </Link>
            <p className="text-small text-default-500"></p>
          </div>
        </CardHeader>

        <Divider />
        <CardBody>
          <TableDynamic />
        </CardBody>
        <Divider />
        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
