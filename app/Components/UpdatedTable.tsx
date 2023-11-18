"use client";
import React, { useEffect, useState } from "react";
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Modal,
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
} from "@nextui-org/react";
import Loading from "react-loading";

import { formatDistanceToNow } from "date-fns";
import { MdRefresh, MdEdit, MdDelete, MdAdd } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
export interface Entry {
  id: String;
  date: Date;
  boardNo: Number;
  nsPairNo: Number;
  ewPairNo: Number;
  contract: String;
  by: String;
  result: String;
  nsScore: Number;
  ewScore: Number;
}

export interface ApiResponse {
  data: Entry[];
}

export interface ApiError {
  message: string;
}
const initialFormData: Entry = {
  // Initialize with default values according to your Entry structure
  id: "", // This might be an empty string or some default value
  date: new Date(), // Set a default date or empty value as per your requirement
  boardNo: 0,
  nsPairNo: 0,
  ewPairNo: 0,
  contract: "",
  by: "",
  result: "",
  nsScore: 0,
  ewScore: 0,
};

const AddLog = () => {
  const [newEntry, setNewEntry] = useState({
    boardNo: 1,
    nsPairNo: 0,
    ewPairNo: 0,
    contract: "",
    by: "",
    result: "",
    nsScore: 0,
    ewScore: 0,
  });

  const handleEntryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof Entry
  ) => {
    const value =
      fieldName === "boardNo" ||
      fieldName === "nsPairNo" ||
      fieldName === "ewPairNo" ||
      fieldName === "nsScore" ||
      fieldName === "ewScore"
        ? parseInt(e.target.value) || 0
        : e.target.value;

    setNewEntry({
      ...newEntry,
      [fieldName]: value,
    });
  };

  /**
   * Adds an entry by making a POST request to the "/api/add-entry" endpoint.
   */
  const addEntry = async () => {
    try {
      await axios.post("/api/add-entry", newEntry);
      toast.success("Entry added successfully");
    } catch (error) {
      console.error("Error adding entry", error);
      toast.error("Error adding entry");
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full ">
      <Input
        isClearable
        label="Board No."
        value={newEntry.boardNo.toString()}
        onChange={(e) => handleEntryChange(e, "boardNo")}
      />
      <Input
        isClearable
        label="NS Pair No."
        value={newEntry.nsPairNo.toString()}
        onChange={(e) => handleEntryChange(e, "nsPairNo")}
      />
      <Input
        isClearable
        label="EW Pair No."
        value={newEntry.ewPairNo.toString()}
        onChange={(e) => handleEntryChange(e, "ewPairNo")}
      />
      <Input
        isClearable
        label="Contract"
        value={newEntry.contract}
        onChange={(e) => handleEntryChange(e, "contract")}
      />
      <Input
        isClearable
        label="By"
        value={newEntry.by}
        onChange={(e) => handleEntryChange(e, "by")}
      />
      <Input
        isClearable
        label="Result"
        value={newEntry.result}
        onChange={(e) => handleEntryChange(e, "result")}
      />
      <Input
        isClearable
        label="NS Score"
        value={newEntry.nsScore.toString()}
        onChange={(e) => handleEntryChange(e, "nsScore")}
      />
      <Input
        isClearable
        label="EW Score"
        value={newEntry.ewScore.toString()}
        onChange={(e) => handleEntryChange(e, "ewScore")}
      />
      <div className="flex flex-col w-full gap-2">
        <Button color="primary" onPress={addEntry}>
          Save To Database
        </Button>
      </div>
    </div>
  );
};

export default AddLog;
