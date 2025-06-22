import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

export interface MoodBoardItem {
  id: string;
  type: 'image' | 'text' | 'sticker';
  content: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  zIndex: number;
}

@Component({
  selector: 'app-moodboard',
  templateUrl: './moodboard.component.html',
  styleUrls: ['./moodboard.component.scss']
})
export class MoodboardComponent implements OnInit, AfterViewInit {
  @ViewChild('moodboardArea', { static: true }) moodboardArea!: ElementRef;

  items: MoodBoardItem[] = [];
  selectedItem: MoodBoardItem | null = null;
  showGrid = true;
  backgroundColor = '#f8f9fa';

  // Drag state
  isDragging = false;
  dragItem: MoodBoardItem | null = null;
  dragOffset = { x: 0, y: 0 };
  isTextEditing = false;

  constructor() { }

  ngOnInit(): void {
    // Load saved items from localStorage
    const savedItems = localStorage.getItem('moodboard-items');
    if (savedItems) {
      this.items = JSON.parse(savedItems);
    }
  }

  ngAfterViewInit(): void {
    // Text content is now handled by [textContent] binding
    // No need for manual initialization
  }

  private initializeTextContent(): void {
    // This method is no longer needed since we use [textContent] binding
  }

  addImage(imageUrl: string): void {
    const newItem: MoodBoardItem = {
      id: this.generateId(),
      type: 'image',
      content: imageUrl,
      x: Math.random() * 200,
      y: Math.random() * 200,
      width: 200,
      height: 200,
      zIndex: this.items.length
    };
    this.items.push(newItem);
    this.saveToLocalStorage();
  }

  addText(text: string = 'Add your text here'): void {
    const newItem: MoodBoardItem = {
      id: this.generateId(),
      type: 'text',
      content: text,
      x: Math.random() * 200,
      y: Math.random() * 200,
      color: '#000000',
      fontSize: 24,
      fontFamily: 'Arial',
      zIndex: this.items.length
    };
    this.items.push(newItem);
    this.saveToLocalStorage();
  }

  addSticker(stickerUrl: string): void {
    const newItem: MoodBoardItem = {
      id: this.generateId(),
      type: 'sticker',
      content: stickerUrl,
      x: Math.random() * 200,
      y: Math.random() * 200,
      width: 100,
      height: 100,
      zIndex: this.items.length
    };
    this.items.push(newItem);
    this.saveToLocalStorage();
  }

  selectItem(item: MoodBoardItem): void {
    this.selectedItem = item;
  }

  deleteItem(item: MoodBoardItem): void {
    const index = this.items.findIndex(i => i.id === item.id);
    if (index > -1) {
      this.items.splice(index, 1);
      this.selectedItem = null;
      this.saveToLocalStorage();
    }
  }

  updateItemPosition(item: MoodBoardItem, x: number, y: number): void {
    item.x = x;
    item.y = y;
    this.saveToLocalStorage();
  }

  updateItemSize(item: MoodBoardItem, width: number, height: number): void {
    item.width = width;
    item.height = height;
    this.saveToLocalStorage();
  }

  updateTextProperties(item: MoodBoardItem, properties: Partial<MoodBoardItem>): void {
    Object.assign(item, properties);
    this.saveToLocalStorage();
  }

  toggleGrid(): void {
    this.showGrid = !this.showGrid;
  }

  changeBackgroundColor(color: string): void {
    this.backgroundColor = color;
  }

  clearBoard(): void {
    this.items = [];
    this.selectedItem = null;
    this.saveToLocalStorage();
  }

  trackByItemId(index: number, item: MoodBoardItem): string {
    return item.id;
  }

  // Custom drag and drop handlers
  onMouseDown(event: MouseEvent, item: MoodBoardItem): void {
    // Don't start drag if we're editing text
    if (this.isTextEditing) {
      return;
    }

    this.isDragging = true;
    this.dragItem = item;
    this.selectedItem = item;

    const container = this.moodboardArea.nativeElement;
    const containerRect = container.getBoundingClientRect();

    this.dragOffset.x = event.clientX - containerRect.left - item.x;
    this.dragOffset.y = event.clientY - containerRect.top - item.y;

    event.preventDefault();
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging || !this.dragItem) return;

    const container = this.moodboardArea.nativeElement;
    const containerRect = container.getBoundingClientRect();

    const newX = event.clientX - containerRect.left - this.dragOffset.x;
    const newY = event.clientY - containerRect.top - this.dragOffset.y;

    // Ensure item stays within bounds
    const maxX = containerRect.width - (this.dragItem.width || 100);
    const maxY = containerRect.height - (this.dragItem.height || 100);

    this.dragItem.x = Math.max(0, Math.min(newX, maxX));
    this.dragItem.y = Math.max(0, Math.min(newY, maxY));
  }

  onMouseUp(): void {
    if (this.isDragging && this.dragItem) {
      this.saveToLocalStorage();
    }

    this.isDragging = false;
    this.dragItem = null;
  }

  onTextFocus(): void {
    this.isTextEditing = true;
  }

  onTextBlur(): void {
    this.isTextEditing = false;
    // Save content when focus is lost
    this.saveToLocalStorage();
  }

  onTextChange(event: Event, item: MoodBoardItem): void {
    const target = event.target as HTMLDivElement;
    item.content = target.textContent || '';
    this.saveToLocalStorage();
  }

  onTextInput(event: Event, item: MoodBoardItem): void {
    const target = event.target as HTMLDivElement;
    item.content = target.textContent || '';
  }

  onTextKeyDown(event: KeyboardEvent, item: MoodBoardItem): void {
    // Allow Enter key for new lines
    if (event.key === 'Enter') {
      event.preventDefault();
      const target = event.target as HTMLDivElement;
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const br = document.createElement('br');
        range.deleteContents();
        range.insertNode(br);
        range.setStartAfter(br);
        range.setEndAfter(br);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }

    // Update content on any key press
    const target = event.target as HTMLDivElement;
    item.content = target.textContent || '';
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('moodboard-items', JSON.stringify(this.items));
  }
}
