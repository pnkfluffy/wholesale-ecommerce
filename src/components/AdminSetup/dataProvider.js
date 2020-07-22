import { fetchUtils } from "react-admin";
import * as React from 'react'
import { stringify } from "query-string";
import { ConnectionStates } from "mongoose";

const apiUrl = "http://localhost:5000";
const httpClient = fetchUtils.fetchJson;

const displayErrorMessage = (props) => {
  return (
  <div style={{width: "25vw"}}>
    <h1>Error message</h1>
    {props}
  </div>
  )
}

export default {
  getList: (resource, params) => {
    console.log("getList resource", resource);

    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    console.log("params", page, perPage, field, order, params.filter);

    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    console.log(url)
    console.log("query", query);
    console.log("url", url);
    return httpClient(url).then(({ headers, json }) => {
      console.log("getList dataprovider method hit")
      // console.log("headers", headers);
      return {
        data: json,
        total: parseInt(headers.get("content-range").split("/").pop(), 10),
      };
    });
  },

  getOne: (resource, params) => {
    console.log("getOne resource", resource);
    

    return httpClient(`${apiUrl}/${resource}/${params.id}`)
    .then(({ json }) => {
      console.log(json);
      return { data: json };
    })

  },

  getMany: (resource, params) => {
    //I think an array of ids is expected in params.
    console.log("getMany");
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  },

  getManyReference: (resource, params) => {
    console.log("getManyReference");

    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      return {
        data: json,
        total: parseInt(headers.get("content-range").split("/").pop(), 10),
      };
    })
  },

  update: (resource, params) => {
    console.log("update");
   return httpClient(`${apiUrl}/${resource}/zog/${params.id}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => {
      // displayErrorMessage(json)
      return { data: json }
    }).catch(err => {
      return displayErrorMessage(err)
    })
  },

  updateMany: (resource, params) => {
    console.log("updateMany");

    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => {
     return { data: json }
    });
  },

  create: (resource, params) => {
    console.log("create");

    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => {
      json = { ...params.data, id: json.id }
      return { data: json }
    })
  },

  delete: (resource, params) => {
    console.log("delete");

    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => {
     return {data: json};
    })
  },

  deleteMany: (resource, params) => {
    console.log("deleteMany");

    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "DELETE",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },
};
