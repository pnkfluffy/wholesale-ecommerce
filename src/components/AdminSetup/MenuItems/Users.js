import * as React from "react";
import { List, Datagrid, TextField } from "react-admin";

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField label="ID" source="id" />
      <TextField label="Name" source="name" />
      <TextField label="Google ID" source="googleID" />
      <TextField label="goCardless Verified" source="Verified" />
      <TextField label="goCardless ID" source="goCardlessID" />
      <TextField label="docusign Verified" source="docusignVerified" />
    </Datagrid>
  </List>
);
