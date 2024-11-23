import { redirect } from "react-router-dom";

export async function action ({request, params}) {
    const { formId } = params;
    const data = await request.formData();
    const studentData = {
      bitsId: data.get("bits_id"),
    };
    const response = await fetch(`http://localhost:3000/mark-attendance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...studentData, formId}),
    });
  
    if (response.status === 422) {
      return response;
    }
  
    if (!response.ok) {
      throw json({ message: "Could not save event." }, { status: 500 });
    }
  
    return redirect("/success");
  }