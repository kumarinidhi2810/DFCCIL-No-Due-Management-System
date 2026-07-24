import {
  Paper,
  Typography,
  Button,
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import logo from "../../assets/images/dfccil-logo.png";

function Certificate() {
  const [data, setData] = useState(null);
  const certRef = useRef();

  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("user")) || {};

    const requests =
      JSON.parse(localStorage.getItem("requests")) || [];

    const approvedRequest = requests.find(
      (request) =>
        request.employeeId === user.employeeId &&
        request.status === "FINAL_APPROVED"
    );

    setData(approvedRequest || null);
  }, []);

  const downloadPDF = async () => {
    const canvas = await html2canvas(certRef.current, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight =
      (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save(
      `No-Due-Certificate-${data.requestId}.pdf`
    );
  };

  const departments =
    JSON.parse(localStorage.getItem("departments")) || [];

  const departmentName = data
    ? departments.find(
        (dept) =>
          String(dept.departmentId) ===
          String(data.departmentId)
      )?.departmentName || "-"
    : "-";

  if (!data) {
    return (
      <Box p={5}>
        <Typography
          variant="h5"
          align="center"
        >
          No Approved Certificate Available
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        background: "#F3F6FB",
        p: 4,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: 900,
          borderRadius: 2,
          border: "6px solid #0B4F9C",
          p: 3,
          background: "#fff",
        }}
      >
        <Box
          ref={certRef}
          sx={{
            border: "2px solid #D4AF37",
            p: 5,
          }}
        >
          {/* HEADER */}

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="2px solid #0B4F9C"
            pb={2}
          >
            <img
              src={logo}
              alt="logo"
              style={{
                width: 80,
              }}
            />

            <Box flex={1} textAlign="center">
              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#0B4F9C",
                }}
              >
                Dedicated Freight Corridor Corporation
                of India Limited
              </Typography>

              <Typography color="text.secondary">
                (A Government of India Enterprise)
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  fontSize: 30,
                  fontWeight: 700,
                  color: "#C62828",
                  letterSpacing: 2,
                }}
              >
                NO DUE CERTIFICATE
              </Typography>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            mt={3}
          >
            <Typography fontWeight={600}>
              Certificate No :
              {" "}
              NDC-{data.requestId}
            </Typography>

            <Typography fontWeight={600}>
              Issue Date :
              {" "}
              {data.createdAt}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography
            sx={{
              fontSize: 16,
              lineHeight: 1.9,
            }}
          >
            This is to certify that the following
            employee has successfully completed all
            No Due formalities and has obtained
            clearance from all concerned
            departments of DFCCIL.
          </Typography>
                 <Divider sx={{ my: 4 }} />

          {/* Employee Details */}

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#0B4F9C",
              mb: 2,
            }}
          >
            Employee Details
          </Typography>

          <TableContainer
            sx={{
              border: "1px solid #D9D9D9",
              borderRadius: 1,
            }}
          >
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>
                    Employee Name
                  </TableCell>

                  <TableCell>
                    {data.employeeName}
                  </TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>
                    Employee ID
                  </TableCell>

                  <TableCell>
                    {data.employeeId}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>
                    Department
                  </TableCell>

                  <TableCell>
                    {departmentName}
                  </TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>
                    Request Type
                  </TableCell>

                  <TableCell>
                    {data.requestType}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>
                    Last Working Date
                  </TableCell>

                  <TableCell>
                    {data.lastWorkingDate}
                  </TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>
                    Issue Date
                  </TableCell>

                  <TableCell>
                    {data.createdAt}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ my: 4 }} />

          {/* Department Clearance */}

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#0B4F9C",
              mb: 2,
            }}
          >
            Department Clearance Status
          </Typography>

          <TableContainer
            sx={{
              border: "1px solid #D9D9D9",
              borderRadius: 1,
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    background: "#0B4F9C",
                  }}
                >
                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Department
                  </TableCell>

                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Status
                  </TableCell>

                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Approved By
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.services?.map((service) => (
                  <TableRow key={service.serviceId}>
                    <TableCell>
                      {service.serviceName}
                    </TableCell>

                    <TableCell
                      sx={{
                        color: "green",
                        fontWeight: 700,
                      }}
                    >
                      ✔ APPROVED
                    </TableCell>

                    <TableCell>
                      {service.approvedBy || "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ my: 4 }} />

          {/* Remarks */}

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#0B4F9C",
            }}
          >
            Remarks
          </Typography>

          <Typography
            mt={2}
            sx={{
              lineHeight: 1.8,
              textAlign: "justify",
            }}
          >
            This certificate confirms that the above
            employee has successfully completed all
            departmental clearance formalities and
            has no outstanding dues pending against
            him/her in the Dedicated Freight Corridor
            Corporation of India Limited.
          </Typography>
                    <Divider sx={{ my: 5 }} />

          {/* Signature Section */}

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            mt={8}
          >
            <Box textAlign="center">
              <Box
                sx={{
                  width: 180,
                  borderTop: "1.5px solid #000",
                  mb: 1,
                }}
              />

            </Box>

            <Box textAlign="center">
              <Box
                sx={{
                  width: 180,
                  borderTop: "1.5px solid #000",
                  mb: 1,
                }}
              />

              <Typography fontWeight={700}>
                Authorized Signatory
              </Typography>

              <Typography variant="body2">
                Human Resource Department
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                DFCCIL
              </Typography>
            </Box>
          </Box>

          {/* Seal */}

          <Box
            mt={6}
            display="flex"
            justifyContent="flex-end"
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                border: "2px dashed #999",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#777",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              Official
              <br />
              Seal
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Footer */}

          <Box textAlign="center">
            <Typography
              variant="body2"
              color="text.secondary"
            >
              This is a computer-generated certificate
              and does not require a physical signature.
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              mt={1}
            >
              Generated on : {new Date().toLocaleDateString()}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Certificate ID : NDC-{data.requestId}
            </Typography>

            <Typography
              sx={{
                mt: 2,
                color: "#0B4F9C",
                fontWeight: 700,
              }}
            >
              Dedicated Freight Corridor Corporation of India Limited
            </Typography>
          </Box>
        </Box>

        <Button
          fullWidth
          variant="contained"
          onClick={downloadPDF}
          sx={{
            mt: 4,
            py: 1.5,
            fontWeight: 700,
            fontSize: 16,
            background: "#0B4F9C",
          }}
        >
          Download Certificate
        </Button>
      </Paper>
    </Box>
  );
}

export default Certificate;   