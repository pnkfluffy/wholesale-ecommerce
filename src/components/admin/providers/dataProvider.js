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

    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    console.log("getlist stats", page,  perPage, field, order, params.filter);

    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    console.log("getList url", url)
    return httpClient(url).then(({ headers, json }) => {
      console.log("getList dataprovider method hit")
      // console.log("headers", headers);
      console.log("getList response: ", { data: json})
      return {
        data: json,
        total: parseInt(headers.get("content-range").split("/").pop(), 10),
      };
    }).catch(err => {
      console.log("getList error: ", err)
    });
  },

  getOne: (resource, params) => {
    console.log(`getOne url: ${apiUrl}/${resource}/${params.id}`)
    return httpClient(`${apiUrl}/${resource}/${params.id}`)
    .then(({ json }) => {
      console.log("json: ", {data: json});
      return { data: json };
    }).catch(err => {
      console.log("getOne error: ", err)
      return err
    })
  },

  getMany: (resource, params) => {
    console.log("getMany", resource);
    console.log("getMany", resource, "params: ", params)
    const query = {
      filter: JSON.stringify({ id: params.ids })
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    console.log("url: ", url)
    return httpClient(url).then(({ json }) => {
      console.log("getMany response: ", {data: json})
      return { data: json }
    }).catch(err => {
      console.log("getmany error: ", err)
    })
  },

  getManyReference: (resource, params) => {
    console.log("getManyReference", resource);

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

    return (httpClient(url).then(({ headers, json }) => {
      return {
        data: json,
        total: parseInt(headers.get("content-range").split("/").pop(), 10),
      };
    }).catch(err => {
      console.log("error: ", err)
      return err
    }))
  },

  update: (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}}`;
    console.log("UPDATING UPDATING UPDATING", url);
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => {
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
