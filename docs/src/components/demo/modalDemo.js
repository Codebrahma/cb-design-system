import React, { useState } from 'react';
import { Box, Button, Modal } from 'cb-design-system';

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      <Modal
        open={isOpen}
        header="Title"
        body="This is body"
        onClose={() => setIsOpen(false)}
      />
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
    </Box>
  );
};
