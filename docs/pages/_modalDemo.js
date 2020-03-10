import React, { useState } from 'react';
import { Box, Button, Modal } from 'cb-design-system';

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      <Modal
        open={isOpen}
        header={() => <h3>Title</h3>}
        body={() => <p>This is body</p>}
        onClose={() => setIsOpen(false)}
      />
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
    </Box>
  );
};
