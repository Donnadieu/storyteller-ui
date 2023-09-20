# frozen_string_literal: true

require 'minitest/autorun'
require_relative '../scripts/cli'

class TestCLI < Minitest::Test
  def setup
    @cli = ::CLI.new
  end

  def test_deploy
    out, _err = capture_io {
      @cli.invoke(:deploy, [], verbose: true)
    }
    assert_match /https?:\/\/(.+)\.vercel\.app/, out
  end
end
