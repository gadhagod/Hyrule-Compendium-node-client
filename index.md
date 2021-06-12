<a name="compendium"></a>

## compendium
<p>Base class for hyrule-compendium</p>

**Kind**: global class  

* [compendium](#compendium)
    * [new compendium([url], [default_timeout])](#new_compendium_new)
    * [.get_entry(entry, callback, [timeout], [error_callback])](#compendium+get_entry)
    * [.get_category(category, callback, [timeout], [error_callback])](#compendium+get_category)
    * [.get_all(callback, timeout, [error_callback])](#compendium+get_all)
    * [.get_entry_image(entry)](#compendium+get_entry_image) ⇒ <code>EntryImage</code>
    * ~~[.download_entry_image(entry, [output_file], [callback], timeout, [error_callback])](#compendium+download_entry_image)~~

<a name="new_compendium_new"></a>

### new compendium([url], [default_timeout])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [url] | <code>string</code> | <code>&quot;https://botw-compendium.herokuapp.com/api/v2&quot;</code> | <p>Base URL for API</p> |
| [default_timeout] | <code>number</code> | <code>20000</code> | <p>Default milliseconds to wait for response for all API calling functions until error</p> |

<a name="compendium+get_entry"></a>

### compendium.get\_entry(entry, callback, [timeout], [error_callback])
<p>Gets an entry</p>

**Kind**: instance method of [<code>compendium</code>](#compendium)  
**Throws**:

- <code>NoEntryError</code> <p>Entry must exist</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| entry | <code>EntryType</code> |  | <p>The entry to be retrieved</p> |
| callback | <code>EntryCallback</code> |  | <p>Function to be executed with API data</p> |
| [timeout] | <code>number</code> | <code>this.default_timeout</code> | <p>Time to wait for response before executing @param <code>error_callback</code></p> |
| [error_callback] | <code>function</code> | <code>(err)&#x3D;&gt;{throw(err)</code> | <p>Function to be executed on error</p> |

<a name="compendium+get_category"></a>

### compendium.get\_category(category, callback, [timeout], [error_callback])
<p>Gets all entries from a category</p>

**Kind**: instance method of [<code>compendium</code>](#compendium)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| category | <code>&quot;creatures&quot;</code> \| <code>&quot;equipment&quot;</code> \| <code>&quot;equipment&quot;</code> \| <code>&quot;materials&quot;</code> \| <code>&quot;monsters&quot;</code> \| <code>&quot;treasure&quot;</code> |  | <p>Name of category</p> |
| callback | <code>CategoryCallback</code> |  | <p>Function to be executed with all entries in the category.</p> |
| [timeout] | <code>number</code> | <code>this.default_timeout</code> | <p>Time to wait for response before executing @param <code>error_callback</code></p> |
| [error_callback] | <code>function</code> | <code>(err)&#x3D;&gt;{throw(err)</code> | <p>Function to be executed on error</p> |

<a name="compendium+get_all"></a>

### compendium.get\_all(callback, timeout, [error_callback])
<p>Gets all entries</p>

**Kind**: instance method of [<code>compendium</code>](#compendium)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback | <code>AllCallback</code> |  | <p>Function to be executed with all entries</p> |
| timeout | <code>number</code> |  | <p>Time to wait for response before executing @param <code>error_callback</code></p> |
| [error_callback] | <code>function</code> | <code>(err)&#x3D;&gt;{throw(err)</code> | <p>Function to be executed on error</p> |

<a name="compendium+get_entry_image"></a>

### compendium.get\_entry\_image(entry) ⇒ <code>EntryImage</code>
<p>Retrieves an entry image</p>

**Kind**: instance method of [<code>compendium</code>](#compendium)  
**Returns**: <code>EntryImage</code> - <p>Image object</p>  

| Param | Type | Description |
| --- | --- | --- |
| entry | <code>EntryType</code> | <p>ID or name of entry</p> |

<a name="compendium+download_entry_image"></a>

### ~~compendium.download\_entry\_image(entry, [output_file], [callback], timeout, [error_callback])~~
***Deprecated***

**Kind**: instance method of [<code>compendium</code>](#compendium)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| entry | <code>EntryType</code> |  | <p>ID or name of entry</p> |
| [output_file] | <code>string</code> |  | <p>File path of which image is to saved, default: &quot;./[entry name].png&quot;</p> |
| [callback] | <code>function</code> | <code>(err: any)&#x3D;&gt;{throw err}</code> | <p>@param callback of https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback</p> |
| timeout | <code>number</code> |  | <p>Time to wait for response before executing @param error_callback</p> |
| [error_callback] | <code>function</code> | <code>(err)&#x3D;&gt;{throw(err)</code> | <p>Function to be executed on error</p> |

