import { infoSidebarIds } from "@utils/dataTestIdsList";
import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";

function InfoSidebar(props: {
  title: string;
  children: React.ReactNode;
  btnText?: string;
  placement?: "start" | "end" | "top" | "bottom";
  backdrop?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { title, children, placement = "start", btnText = "Show", backdrop = false, className = "", style } = props;
  return (
    <>
      <Button data-testid={infoSidebarIds.toggleBtn} variant="primary" className="d-md-none" onClick={handleShow}>
        {btnText}
      </Button>

      <Offcanvas
        data-testid={infoSidebarIds.infoSidebar}
        className={`bg-dark text-light h-50 ${className}`}
        show={show}
        style={style ? style : {}}
        onHide={handleClose}
        placement={placement}
        responsive="md"
        backdrop={backdrop}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="w-100 d-flex">{children}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default InfoSidebar;
