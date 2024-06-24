import adminhttpService from "../adminhttpService";
import { toast } from "react-toastify";

export async function LoginVisitor(formData) {
  try {
    const { data, headers } = await adminhttpService.patch(
      `${process.env.REACT_APP_APIENDPOINT}api/visitor/warehouseLogin`,
      formData
    );
    console.log("headers", headers);

    if (!data.error) {
      await localStorage.removeItem("token-visitor");
      await localStorage.setItem(
        "token-visitor",
        headers["x-auth-token-associate"]
      );

      toast.success(data?.message, { autoClose: 1500 });
    } else toast.error(data?.message);

    console.log(data.message);
    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    console.log("caleed");

    return { error };
  }
}

export async function scanQrView(url) {
  try {
    const { data, error } = await adminhttpService.get(url);
    console.log(data);
    return { data, error };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
export async function scanQrEntry(id) {
  try {
    const { data, error } = await adminhttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}api/visitor/entryScan/` + id
    );
    console.log(data);
    if (!data.error) {
      toast.success(data?.message);
    }
    return { data, error };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function scanQrExit(id, ID) {
  try {
    const { data } = await adminhttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}api/visitor/exitScan/` +
        id +
        "/" +
        ID
    );
    console.log(data);
    if (!data.error) {
      toast.success(data?.message);
    }
    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function getVisitorsLog(formData) {
  try {
    const { data } = await adminhttpService.patch(
      `${process.env.REACT_APP_APIENDPOINT}api/visitor/getVisitorLog`,
      formData
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
export async function getAgents(formData) {
  try {
    const { data } = await adminhttpService.patch(
      `${process.env.REACT_APP_APIENDPOINT}api/visitor/getAgent`,
      formData
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function viewAgent(id) {
  try {
    const { data,error } = await adminhttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}api/visitor/viewAgent/${id}`
    );
    console.log(data);

    return { data,error };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
export async function createNewVisitor(formData) {
  try {
    const { data } = await adminhttpService.post(
      `${process.env.REACT_APP_APIENDPOINT}api/visitor/addAgent`,
      formData
    );
    console.log(data);
    if (!data.error) {
      toast.success(data.message);
    } else toast.error(data.message, { autoClose: 1500 });

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function editStaff(formData) {
  try {
    const { data } = await adminhttpService.put(
      `${process.env.REACT_APP_APIENDPOINT}api/partner/updateSubAdmin`,
      formData
    );
    console.log(data);
    if (!data.error) {
      toast.success(data.message);
    } else toast.error(data.message, { autoClose: 1500 });

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
export async function updateVenue(formData) {
  try {
    const { data } = await adminhttpService.put(
      `${process.env.REACT_APP_APIENDPOINT}api/partner/updateVenue`,
      formData
    );
    console.log(data);
    if (!data.error) {
      toast.success(data.message);
    } else toast.error(data.message, { autoClose: 1500 });

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
export async function updateEvent(formData) {
  try {
    const { data } = await adminhttpService.put(
      `${process.env.REACT_APP_APIENDPOINT}api/partner/updateEvent`,
      formData
    );
    console.log(data);
    if (!data.error) {
      toast.success(data.message);
    } else toast.error(data.message, { autoClose: 1500 });

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
export async function getDashboardCount() {
  try {
    const { data } = await adminhttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/admin/getDashboardCount`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
export async function getBookings(formData) {
  try {
    const { data } = await adminhttpService.patch(
      `${process.env.REACT_APP_APIENDPOINT}api/partner/getBookings`,
      formData
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
