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

const TableDynamic: React.FC = () => {
  const [data, setData] = useState<Entry[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
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
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Entry>(initialFormData); // Initialize with the structure of your Entry type

  const handleEditClick = (entry: Entry) => {
    setEditRowId(entry.id.toString());
    setEditFormData({ ...entry });
  };

  const handleEditFormChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof Entry
  ) => {
    setEditFormData({ ...editFormData, [fieldName]: event.target.value });
  };
  const handleCancelClick = () => {
    setEditRowId(null);
  };

  const handleSaveClick = async () => {
    try {
      // Assuming '/api/update-entry' is your API endpoint for updating an entry
      await axios.post(`/api/edit-entry/`, editFormData);
      toast.success("Entry updated successfully");

      // Refresh data in the table
      fetchData();

      // Reset edit mode
      setEditRowId(null);
    } catch (error) {
      console.error("Error updating entry:", error);
      toast.error("Error updating entry");
    }
  };

  const handleSave = async (id: string) => {
    // ... implementation as before
  };

  /**
   * Adds an entry by making a POST request to the "/api/add-entry" endpoint.
   * After successfully adding the entry, it refreshes the data, displays a success toast message, and closes the modal.
   * If an error occurs while adding the entry, it logs the error, displays an error toast message, and keeps the modal open.
   *
   * @return {void}
   */
  const addEntry = async () => {
    try {
      await axios.post("/api/add-entry", newEntry);
      fetchData(); // Refresh data
      toast.success("Entry added successfully");
    } catch (error) {
      console.error("Error adding entry", error);
      toast.error("Error adding entry");
    }
    onOpenChange(); // Close the modal after the operation
    setShowModal(false); // Update the showModal state
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/get-entries");
      setData(response.data.entries);
      toast.success("Data fetched successfully");
    } catch (error) {
      // Handle the error appropriately
      toast.error("Error fetching data");
    }
  };

  const filteredData = data.filter(
    (entry) =>
      searchQuery === "" ||
      entry.boardNo.toString().includes(searchQuery) ||
      entry.nsPairNo.toString().includes(searchQuery) ||
      entry.ewPairNo.toString().includes(searchQuery) ||
      entry.contract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.by.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/get-entries");
        setData(response.data.entries);
      } catch (error) {
        // toast.error("Error fetching data");
      }
    };

    fetchData();
    onOpenChange();
  }, []);
  /**
   * Handles the change event of the input field.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event object.
   * @param {keyof Entry} fieldName - The name of the field being changed.
   * @return {void}
   */
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
  const handleDelete = async (id: String) => {
    try {
      await axios.post(`/api/delete-entry`, { id });
      toast.success("Entry deleted successfully");
      fetchData(); // Refresh data
    } catch (error) {
      console.error("Error deleting entry", error);
      toast.error("Error deleting entry");
    }
  };

  return (
    <div>
      <Input
        isClearable
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="flex flex-row gap-2 items-center ">
        <Button color="primary" onClick={fetchData} size="sm">
          <MdRefresh /> {/* Icon */}
        </Button>

        {data.length === 0 && <Loading type="spinningBubbles" color="#fff" />}
      </div>

      {data.length > 0 && (
        <Table>
          <TableHeader>
            <TableColumn>Actions</TableColumn>
            <TableColumn>Time</TableColumn>
            <TableColumn>Board No.</TableColumn>
            <TableColumn>NS Pair No.</TableColumn>
            <TableColumn>EW Pair No.</TableColumn>
            <TableColumn>Contract</TableColumn>
            <TableColumn>By</TableColumn>
            <TableColumn>Result</TableColumn>
            <TableColumn>NS Score</TableColumn>
            <TableColumn>EW Score</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredData.reverse().map((entry, i) => (
              <TableRow key={i}>
                {/* Actions */}
                <TableCell>
                  {editRowId === entry.id ? (
                    <>
                      <Chip onClick={() => handleSaveClick()} color="success">
                        Save
                      </Chip>
                      <Chip onClick={handleCancelClick} color="warning">
                        Cancel
                      </Chip>
                    </>
                  ) : (
                    <>
                      <Chip
                        color="primary"
                        onClick={() => handleEditClick(entry)}
                      >
                        Edit
                      </Chip>
                      <Chip
                        color="danger"
                        onClick={() => handleDelete(entry.id)}
                      >
                        Delete
                      </Chip>
                    </>
                  )}
                </TableCell>

                {/* Time */}
                <TableCell>
                  {editRowId === entry.id ? (
                    <Input
                      type="text"
                      value={editFormData.date.toString()} // Adjust this according to your needs
                      onChange={(e) => handleEditFormChange(e, "date")}
                    />
                  ) : (
                    formatDistanceToNow(new Date(entry.date)) + " ago"
                  )}
                </TableCell>

                {/* Board No. */}
                <TableCell>
                  {editRowId === entry.id ? (
                    <Input
                      type="text"
                      value={editFormData.boardNo.toString()}
                      onChange={(e) => handleEditFormChange(e, "boardNo")}
                    />
                  ) : (
                    String(entry.boardNo)
                  )}
                </TableCell>

                {/* NS Pair No. */}
                <TableCell>
                  {editRowId === entry.id ? (
                    <Input
                      type="text"
                      value={editFormData.nsPairNo.toString()}
                      onChange={(e) => handleEditFormChange(e, "nsPairNo")}
                    />
                  ) : (
                    String(entry.nsPairNo)
                  )}
                </TableCell>

                {/* EW Pair No. */}
                <TableCell>
                  {editRowId === entry.id ? (
                    <Input
                      type="text"
                      value={editFormData.ewPairNo.toString()}
                      onChange={(e) => handleEditFormChange(e, "ewPairNo")}
                    />
                  ) : (
                    String(entry.ewPairNo)
                  )}
                </TableCell>

                {/* Contract */}
                <TableCell>
                  {editRowId === entry.id ? (
                    <Input
                      type="text"
                      value={editFormData.contract.toString()}
                      onChange={(e) => handleEditFormChange(e, "contract")}
                    />
                  ) : (
                    entry.contract
                  )}
                </TableCell>

                {/* By */}
                <TableCell>
                  {editRowId === entry.id ? (
                    <Input
                      type="text"
                      value={editFormData.by.toString()}
                      onChange={(e) => handleEditFormChange(e, "by")}
                    />
                  ) : (
                    entry.by
                  )}
                </TableCell>

                {/* Result */}
                <TableCell>
                  {editRowId === entry.id ? (
                    <Input
                      type="text"
                      value={editFormData.result.toString()}
                      onChange={(e) => handleEditFormChange(e, "result")}
                    />
                  ) : (
                    entry.result
                  )}
                </TableCell>

                {/* NS Score */}
                <TableCell>
                  {editRowId === entry.id ? (
                    <Input
                      type="text"
                      value={editFormData.nsScore.toString()}
                      onChange={(e) => handleEditFormChange(e, "nsScore")}
                    />
                  ) : (
                    String(entry.nsScore)
                  )}
                </TableCell>

                {/* EW Score */}
                <TableCell>
                  {editRowId === entry.id ? (
                    <Input
                      type="text"
                      value={editFormData.ewScore.toString()}
                      onChange={(e) => handleEditFormChange(e, "ewScore")}
                    />
                  ) : (
                    String(entry.ewScore)
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TableDynamic;
