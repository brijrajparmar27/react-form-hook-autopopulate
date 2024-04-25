import { MenuItem, TextField } from "@mui/material";
import "./App.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { DevTool } from "@hookform/devtools";

function App() {
  const { register, reset, control } = useForm();
  const [entry, setEntry] = useState({});
  const data = [
    {
      name: "United States",
      states: [
        {
          name: "California",
          age_groups: {
            "20-30": [
              {
                full_name: "John Doe",
                phone_number: "555-555-5555",
                email: "john.doe@example.com",
              },
              {
                full_name: "Jane Doe",
                phone_number: "555-555-5556",
                email: "jane.doe@example.com",
              },
            ],
            "31-40": [
              {
                full_name: "Mike Smith",
                phone_number: "555-555-5557",
                email: "mike.smith@example.com",
              },
              {
                full_name: "Sarah Jones",
                phone_number: "555-555-5558",
                email: "sarah.jones@example.com",
              },
            ],
          },
        },
        {
          name: "Texas",
          age_groups: {
            "20-30": [
              {
                full_name: "David Lee",
                phone_number: "555-555-5559",
                email: "david.lee@example.com",
              },
              {
                full_name: "Emily Chen",
                phone_number: "555-555-5560",
                email: "emily.chen@example.com",
              },
            ],
            "31-40": [
              {
                full_name: "William Brown",
                phone_number: "555-555-5561",
                email: "william.brown@example.com",
              },
              {
                full_name: "Jennifer Taylor",
                phone_number: "555-555-5562",
                email: "jennifer.taylor@example.com",
              },
            ],
          },
        },
      ],
    },
    {
      name: "Canada",
      states: [
        {
          name: "Ontario",
          age_groups: {
            "20-30": [
              {
                full_name: "Mark Anderson",
                phone_number: "+1-555-555-5563",
                email: "mark.anderson@example.com",
              },
              {
                full_name: "Susan Davis",
                phone_number: "+1-555-555-5564",
                email: "susan.davis@example.com",
              },
            ],
            "31-40": [
              {
                full_name: "Peter Williams",
                phone_number: "+1-555-555-5565",
                email: "peter.williams@example.com",
              },
              {
                full_name: "Katherine Miller",
                phone_number: "+1-555-555-5566",
                email: "katherine.miller@example.com",
              },
            ],
          },
        },
        {
          name: "Quebec",
          age_groups: {
            "20-30": [
              {
                full_name: "Alexandre Tremblay",
                phone_number: "+1-555-555-5567",
                email: "alexandre.tremblay@example.com",
              },
              {
                full_name: "Isabelle Dubois",
                phone_number: "+1-555-555-5568",
                email: "isabelle.dubois@example.com",
              },
            ],
            "31-40": [
              {
                full_name: "Peter Williams",
                phone_number: "+1-555-555-5565",
                email: "peter.williams@example.com",
              },
              {
                full_name: "Katherine Miller",
                phone_number: "+1-555-555-5566",
                email: "katherine.miller@example.com",
              },
            ],
          },
        },
      ],
    },
  ];

  return (
    <div>
      <form className="form">
        <div className="row">
          <TextField
            label="Country"
            select
            sx={{ flex: 1 }}
            {...register("country", {
              onChange: (e) => {
                setEntry((prev) => {
                  return { country: e.target.value };
                });
                reset({ country: e.target.value });
              },
            })}
          >
            {data.map((each) => {
              return <MenuItem value={each.name}>{each.name}</MenuItem>;
            })}
          </TextField>
          <TextField
            label="state"
            select
            sx={{ flex: 1 }}
            // onChange={handleChange}
            {...register("state", {
              onChange: (e) => {
                setEntry((prev) => {
                  reset({ country: prev.country, state: e.target.value });
                  return { ...prev, state: e.target.value };
                });
              },
            })}
          >
            {data
              .find((each) => each.name === entry.country)
              ?.states.map((each) => {
                return <MenuItem value={each.name}>{each.name}</MenuItem>;
              })}
          </TextField>
        </div>
        <div className="row">
          <TextField label="Age" sx={{ flex: 1 }} {...register("age")} select>
            {
              entry && entry.state && Object.keys(data?.find((each) => each.name === entry.country)?.states?.find((each) => each.name === entry.state)?.age_groups)?.map((key, index) => {
                return <MenuItem value={key}>{key}</MenuItem>;
              })
            }
          </TextField>
          <TextField
            // value={age}
            sx={{ flex: 1 }}
            label="Name"
            select
            {...register("name")}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </TextField>
          <TextField label="Email" {...register("email")} />
          <TextField label="Phone" {...register("phone")} />
        </div>
        <input type="submit" value="Submit" />
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default App;
