
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { latex, options = {} } = await req.json()
    
    if (!latex) {
      return new Response(
        JSON.stringify({ error: 'LaTeX content is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Default Pandoc options
    const defaultOptions = {
      from: 'latex',
      to: 'html',
      mathjax: true,
      standalone: false,
      ...options
    }

    // Build Pandoc command arguments
    const args = [
      `--from=${defaultOptions.from}`,
      `--to=${defaultOptions.to}`,
    ]

    if (defaultOptions.mathjax) {
      args.push('--mathjax')
    }

    if (defaultOptions.standalone) {
      args.push('--standalone')
    }

    // Create a temporary file for the LaTeX content
    const tempFile = await Deno.makeTempFile({ suffix: '.tex' })
    await Deno.writeTextFile(tempFile, latex)

    try {
      // Run Pandoc conversion
      const command = new Deno.Command('pandoc', {
        args: [...args, tempFile],
        stdout: 'piped',
        stderr: 'piped',
      })

      const { code, stdout, stderr } = await command.output()

      if (code !== 0) {
        const errorText = new TextDecoder().decode(stderr)
        console.error('Pandoc error:', errorText)
        return new Response(
          JSON.stringify({ error: 'Pandoc conversion failed', details: errorText }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      const html = new TextDecoder().decode(stdout)
      
      return new Response(
        JSON.stringify({ html, success: true }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    } finally {
      // Clean up temporary file
      try {
        await Deno.remove(tempFile)
      } catch (e) {
        console.warn('Failed to remove temp file:', e)
      }
    }
  } catch (error) {
    console.error('Error in convert-latex function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
