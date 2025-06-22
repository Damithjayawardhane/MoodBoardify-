import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Output() addImage = new EventEmitter<string>();
  @Output() addText = new EventEmitter<string>();
  @Output() addSticker = new EventEmitter<string>();
  @Output() changeBackgroundColor = new EventEmitter<string>();

  selectedColor = '#f8f9fa';
  textInput = '';
  showColorPicker = false;
  showStickerPicker = false;

  // Predefined stickers (emoji-based for simplicity)
  stickers = [
    '😊', '❤️', '🌟', '🎨', '✨', '🔥', '💎', '🌸', '🌺', '🌻',
    '🍀', '🌈', '⭐', '💫', '🎯', '🎪', '🎭', '🎨', '🎬', '🎤'
  ];

  // Predefined background colors
  backgroundColors = [
    '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd',
    '#6c757d', '#495057', '#343a40', '#212529', '#ffffff',
    '#f8f9fa', '#e3f2fd', '#f3e5f5', '#e8f5e8', '#fff3e0',
    '#fce4ec', '#f1f8e9', '#e0f2f1', '#fafafa', '#f5f5f5'
  ];

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.addImage.emit(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    }
    // Reset file input
    event.target.value = '';
  }

  onAddText(): void {
    if (this.textInput.trim()) {
      this.addText.emit(this.textInput.trim());
      this.textInput = '';
    }
  }

  onAddSticker(sticker: string): void {
    // Convert emoji to a simple sticker representation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = 100;
      canvas.height = 100;
      ctx.font = '60px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(sticker, 50, 50);
      const dataUrl = canvas.toDataURL();
      this.addSticker.emit(dataUrl);
    }
    this.showStickerPicker = false;
  }

  onColorSelect(color: string): void {
    this.selectedColor = color;
    this.changeBackgroundColor.emit(color);
    this.showColorPicker = false;
  }

  toggleColorPicker(): void {
    this.showColorPicker = !this.showColorPicker;
    this.showStickerPicker = false;
  }

  toggleStickerPicker(): void {
    this.showStickerPicker = !this.showStickerPicker;
    this.showColorPicker = false;
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onAddText();
    }
  }
}
