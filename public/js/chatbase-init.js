(function () {
  if (!window.chatbase || window.chatbase("getState") !== "initialized") {
    window.chatbase = (...args) => {
      if (!window.chatbase.q) window.chatbase.q = [];
      window.chatbase.q.push(args);
    };
    window.chatbase = new Proxy(window.chatbase, {
      get(target, prop) {
        if (prop === "q") return target.q;
        return (...args) => target(prop, ...args);
      },
    });
  }

  window.initChatbaseMessages = function () {
    const currentPage = window.location.pathname;
    let messages = [];

    if (currentPage.includes('/home')) {
      messages = [
        "Hi!",
        localStorage.getItem("userName"),
        "I am CareBridge, your AI assistant tool for Patient Care.",
        " What can I help you with?"
      ];
    }
    window.chatbase.setInitialMessages(messages);
  }
  window.chatbase("registerTools", {
    search_fhir_patient: async (args) => {
      try {
        const { family = "", given = "", email = "", birthdate = "", gender = "" } = args;
        const query = new URLSearchParams({ family, given, email, birthdate, gender }).toString();
        const token = localStorage.getItem("authToken"); // dynamic token from login

        const response = await fetch(
          `https://fhirassist.rsystems.com:481/baseR4/Patient?${query}`,
          {
            method: "GET",
            headers: {
              "Accept": "application/fhir+json",
              "Authorization": "Bearer " + token
            }
          }
        );
        if (!response.ok) throw new Error("Failed to fetch patient data");
        return { status: "success", data: await response.json() };
      } catch (error) {
        return { status: "error", error: error.message };
      }
    },

    search_patient_observations: async (args) => {
      try {
        const { value_quantity = "", code = "", subject = "", encounter = "" } = args;
        const query = new URLSearchParams({ value_quantity, code, subject, encounter }).toString();
        const token = localStorage.getItem("authToken"); // dynamic token from login

        const response = await fetch(
          `https://fhirassist.rsystems.com:481/baseR4/Observations?${query}`,
          {
            method: "GET",
            headers: {
              "Accept": "application/fhir+json",
              "Authorization": "Bearer " + token
            }
          }
        );

        if (!response.ok) throw new Error("Failed to fetch Observations data");
        return { status: "success", data: await response.json() };
      } catch (error) {
        return { status: "error", error: error.message };
      }
    },

    search_patient_procedure: async (args) => {
      try {
        const { subject = "", code = "", encounter = "" } = args;
        const query = new URLSearchParams({ subject, code, encounter }).toString();
        const token = localStorage.getItem("authToken"); // dynamic token from login
        const response = await fetch(
          `https://fhirassist.rsystems.com:481/baseR4/Procedure?${query}`,
          {
            method: "GET",
            headers: {
              "Accept": "application/fhir+json",
              "Authorization": "Bearer " + token
            }
          }
        );

        if (!response.ok) throw new Error("Failed to fetch Observations data");
        return { status: "success", data: await response.json() };
      } catch (error) {
        return { status: "error", error: error.message };
      }
    },
    search_patient_medications: async (args) => {
      try {
        const { subject = "", prescriptionId = "",code="" } = args;
        const query = new URLSearchParams({ subject, prescriptionId,code }).toString();
        const token = localStorage.getItem("authToken"); // dynamic token from login
        const response = await fetch(
          `https://fhirassist.rsystems.com:481/baseR4/MedicationRequest?${query}`,
          {
            method: "GET",
            headers: {
              "Accept": "application/fhir+json",
              "Authorization": "Bearer " + token
            }
          }
        );

        if (!response.ok) throw new Error("Failed to fetch MedicationRequest data");
        return { status: "success", data: await response.json() };
      } catch (error) {
        return { status: "error", error: error.message };
      }
    },
    search_patient_encounter: async (args) => {
      try {
        const { subject = "", startDate, endDate } = args;

        const params = new URLSearchParams();
        if (subject) params.append("subject", subject);
        if (startDate) params.append("date", `${startDate}`);
        if (endDate) params.append("date", `${endDate}`);

        const token = localStorage.getItem("authToken");

        const response = await fetch(
          `https://fhirassist.rsystems.com:481/baseR4/Encounter?${params.toString()}`,
          {
            method: "GET",
            headers: {
              "Accept": "application/fhir+json",
              "Authorization": "Bearer " + token
            }
          }
        );

        if (!response.ok) throw new Error("Failed to fetch Encounter data");

        return { status: "success", data: await response.json() };
      } catch (error) {
        return { status: "error", error: error.message };
      }
    },
    search_patient_condition: async (args) => {
      try {
        const { subject = "", code = "", encounter = "" } = args;
        const query = new URLSearchParams({ subject, code, encounter }).toString();
        const token = localStorage.getItem("authToken"); // dynamic token from login
        const response = await fetch(
          `https://fhirassist.rsystems.com:481/baseR4/Condition?${query}`,
          {
            method: "GET",
            headers: {
              "Accept": "application/fhir+json",
              "Authorization": "Bearer " + token
            }
          }
        );

        if (!response.ok) throw new Error("Failed to fetch condition data");
        return { status: "success", data: await response.json() };
      } catch (error) {
        return { status: "error", error: error.message };
      }
    }

  });
})();
