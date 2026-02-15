Aside from the Creative-specific flying and menu shortcuts, Minecraft’s general controls handle your movement, interaction, and system settings.

### 1. Basic Movement & Action

|**Action**|**PC (Java/Bedrock)**|**Xbox/PS/Switch**|
|---|---|---|
|**Walk**|**W, A, S, D**|Left Stick|
|**Jump / Swim Up**|**Space**|A / X / B|
|**Sneak / Crouch**|**Left Shift**|B / Circle / A|
|**Sprint**|**Left Ctrl** (or double-tap W)|Click Left Stick (L3)|
|**Attack / Destroy**|**Left Click**|Right Trigger (RT / R2)|
|**Use / Place Block**|**Right Click**|Left Trigger (LT / L2)|
|**Drop Item**|**Q** (Ctrl+Q for full stack)|D-Pad Down|

---

### 2. Inventory & HUD

- **Open Inventory:** Press **E** (PC) or **Y / Triangle / X** (Consoles).
    
- **Hotbar Slots:** Use numbers **1–9** to quickly jump to a specific item.
    
- **Swap Hands:** Press **F** to move an item to your "Off-hand" (PC only).
    
- **Toggle Perspective:** Press **F5** (PC) or **D-Pad Up** (Consoles) to switch between First-Person and Third-Person views.
    
- **Hide Interface (HUD):** Press **F1** to hide your health, hotbar, and hand (great for taking clean screenshots).
    

---

### 3. Utility & Debug (PC "Java Edition" Only)

If you are on the Java Edition (PC), there are several "Secret" shortcuts using the **F3** key:

- **F3 (Held):** Shows a list of all debug shortcuts.
    
- **F3 + H:** Shows "Advanced Tooltips" (this lets you see item durability and internal IDs).
    
- **F3 + G:** Shows **Chunk Borders** (useful for building machines or finding spawn chunks).
    
- **F3 + B:** Shows **Hitboxes** (helps you see exactly where a mob can be hit).
    
- **F2:** Takes a screenshot and saves it to your game folder.
    

---

### 4. Touch Controls (Mobile)

- **Movement:** Use the virtual joystick/arrows on the left.
    
- **Looking Around:** Drag your finger anywhere on the screen.
    
- **Breaking Blocks:** Tap and hold the block.
    
- **Placing Blocks:** A quick tap on the screen.
    
- **Sneak/Jump:** Buttons are located on the bottom right.
    

### 5. Customizing Your Controls

If you don't like these defaults (for example, many players move "Drop Item" away from **Q** so they don't accidentally throw their sword into lava), you can change them:

1. Press **Esc** (or Pause).
    
2. Go to **Options** (or Settings).
    
3. Select **Controls** -> **Keybinds**.

--- 

### 1. Essential Creative Controls (All Platforms)

|**Action**|**PC (Keyboard & Mouse)**|**Console (Xbox/PS/Switch)**|
|---|---|---|
|**Start/Stop Flying**|**Double-tap** Space|**Double-tap** A (Xbox) / X (PS) / B (Switch)|
|**Ascend (Fly Up)**|Hold Space|Hold A (Xbox) / X (PS) / B (Switch)|
|**Descend (Fly Down)**|Hold Left Shift|Hold B (Xbox) / Circle (PS) / A (Switch)|
|**Pick Block**|**Middle-click** (Scroll Wheel)|**D-Pad Up** (By default)|
|**Instant Destroy**|Left-click|Right Trigger (RT / R2 / ZR)|
|**Place Block**|Right-click|Left Trigger (LT / L2 / ZL)|

> **Tip:** "Pick Block" is incredibly useful. If you are looking at a block in the world and use this button, that block will instantly appear in your hotbar so you don't have to search for it in the menu.

---

### 2. Inventory & Shortcut Tricks (Java Edition)

In Creative mode, you have special shortcuts to manage your inventory faster:

- **Clear Inventory:** Open your inventory and **Shift + Left-click** the "X" (Destroy Item) icon in the bottom right.
    
- **Get a Full Stack:** **Shift + Left-click** an item in the Creative menu to move a full stack (64) directly to your hotbar.1
    
- **Save Toolbars:** You can save your current hotbar setup by pressing **Ctrl + 1–9**. You can then load that exact setup later by pressing **X + 1–9**.2
    
- **Duplicate Items:** While your inventory is open, **Middle-click** an item to create a full stack of it on your cursor.
--- 
# **General Syntax for placing blocks:**  
`/fill <x1> <y1> <z1> <x2> <y2> <z2> <block_name> [options]` 

**Example:**  
To create a 10x1x10 stone platform at coordinates starting near your current location:  
`/fill ~ ~ ~ ~9 ~ ~9 minecraft:stone` 

- `~ ~ ~`: The starting coordinates (relative to your current position). This would be one corner.
- `~9 ~ ~9`: The ending coordinates (9 blocks in the X direction, 0 in Y, and 9 in Z from your position). This defines the opposite corner and makes a 10x10 area.
- `minecraft:stone`: The block type to fill the area with. 

Step-by-Step Guide

1. **Enable Cheats:** Ensure cheats are enabled in your world settings.
2. **Locate the First Corner:** Go to one corner of where you want your platform to start.
3. **Record Coordinates (or use tilde shortcut):**
    - **Manual:** Press `F3` (Java Edition) to view your coordinates (X, Y, Z) and write them down.
    - **Shortcut:** Type `/fill` (including the space) in the chat and press the `Tab` key three times to automatically input your current coordinates.
4. **Locate the Second Corner:** Move to the opposite, diagonal corner of where the platform should end.
5. **Complete the Command:**
    - Open the chat again. If using the shortcut, press the `Up` arrow key to retrieve the previous command.
    - Enter the second set of coordinates (either manually or using the `Tab` key shortcut).
    - Add a space, then type the name of the block you want to use (e.g., `stone`, `cobblestone`, `air` to clear an area).
6. **Execute:** Press `Enter` to create the platform
---
The Minecraft `/fill` command is a powerful administrative command that allows you to instantly fill a cuboid region of blocks with a specified block type. This is incredibly useful for quickly building, clearing large areas, or creating rooms and structures.

The basic structure of the command is:

$$\text{/fill } x1 \text{ } y1 \text{ } z1 \text{ } x2 \text{ } y2 \text{ } z2 \text{ } \langle\text{block\_name}\rangle \text{ } [\text{options}]$$

---

### **1. Coordinates ($\mathbf{x1 \text{ } y1 \text{ } z1}$ and $\mathbf{x2 \text{ } y2 \text{ } z2}$)**

These two sets of coordinates define the opposite corners of the rectangular prism (cuboid) area you want to fill.

- **Absolute Coordinates:** You can use specific numerical coordinates (e.g., `100 64 -50`). You typically find these by pressing F3 (Java Edition) or by enabling "Show Coordinates" (Bedrock Edition).
    
- **Relative Coordinates:** Using the tilde symbol (`~`) makes a coordinate relative to your player's current position.
    
    - `~ ~ ~` refers to the block you are standing in.
        
    - `~5 ~-2 ~10` refers to 5 blocks along the X-axis, 2 blocks down on the Y-axis, and 10 blocks along the Z-axis, all relative to your current location. This is often the quickest way to define the area.
        

### **2. Block Name ($\mathbf{\langle block\_name \rangle}$)**

This is the technical name of the block you wish to fill the area with (e.g., `minecraft:stone`, `cobblestone`, `air`, `diamond_block`).

- Using `air` as the block name is the primary way to **remove** or clear out a section of the world.
    

### **3. Optional Arguments ($\mathbf{[options]}$)**

After the block name, you can add optional arguments to control how the blocks are placed, especially concerning existing blocks in the area. The most common fill modes include:

|**Option**|**Description**|**Effect on Area**|
|---|---|---|
|**replace**|(Default) Replaces **all** blocks in the defined area with the new block. You can optionally specify a target block to only replace a certain type (e.g., `... replace dirt` would only replace dirt blocks).|Replaces everything.|
|**keep**|Only fills **air** blocks within the area. Existing non-air blocks are left untouched.|Preserves existing structures.|
|**hollow**|Fills only the outer layer of the area with the new block, turning all interior blocks into `air`.|Creates an empty room.|
|**outline**|Fills only the outer layer of the area with the new block, leaving all interior blocks as they were.|Creates a filled structure's shell.|
|**destroy**|Replaces all blocks, but causes the existing blocks to drop as collectible items (as if they were mined).|Replaces everything and drops items.|

### **Example Use Case**

If you want to create a 10x10x5 room of smooth stone, and your first corner is at coordinates `100 64 200`, your second corner (diagonally opposite) might be at `110 68 210`.

1. To fill the whole box with stone:
    
    /fill 100 64 200 110 68 210 smooth_stone
    
2. To hollow out that box (create the empty room):
    
    /fill 100 64 200 110 68 210 smooth_stone hollow
    
3. To remove the entire box (replace everything with air):
    
    /fill 100 64 200 110 68 210 air
    

The `/fill` command is a crucial tool for mapmakers, builders, and server administrators, allowing for precise, rapid modification of the world.

This video provides a quick tutorial on how to use the fill command in Minecraft. [Mighty Minute with Minecraft: Using the Fill Command #minecraft](https://www.youtube.com/watch?v=UgC5AktAxXw)


