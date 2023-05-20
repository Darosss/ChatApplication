export const scrollToBottom = (sectionId: string) => {
  const elementToScroll = document.getElementById(sectionId);
  if (elementToScroll) elementToScroll.scrollTop = elementToScroll.scrollHeight;
};
